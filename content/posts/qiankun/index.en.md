---
weight: 3
title: "qiankun"
date: 2025-07-06
lastmod: 2025-07-06
draft: false
author: "ZHOUKAILIAN"
# authorLink: "https://dillonzq.com"
description: "qiankun 框架源码分析"
images: []
# resources:
#   - name: "featured-image"
# src: "featured-image.png"

tags: ["微前端", "web"]
# categories: ["Markdown"]

lightgallery: true
---

# 概述

&emsp;&emsp;qiankun 作为一款微前端领域的知名框架，其建立在 single-spa 基础上。相较于 single-spa，qiankun 做了两件重要的事情，其一是加载资源，第二是进行资源隔离。

# qiankun JS 隔离的发展史

&emsp;&emsp;一个微前端最重要的就是 js 隔离以及 css 隔离，qiankun 有三种 js 隔离机制，分别是 SnapshotSandbox（快照沙箱）、LegacySandbox（支持单应用的代理沙箱）、ProxySandbox（支持多应用的代理沙箱）。

&emsp;&emsp;在 qiankun 的微前端架构中，最初的沙箱机制是通过 SnapshotSandbox 实现的。该方法需要遍历 window 上的所有属性，因此性能较差。随着 ES6 的普及，Proxy 的引入提供了一种更高效的解决方案，这就诞生了 LegacySandbox。LegacySandbox 使用 Proxy 来实现与 SnapshotSandbox 相似的功能，但性能更好。不过，由于会污染全局的 window 对象，它仅支持单个微应用的运行。随着更高效的机制出现，LegacySandbox 被替代为 ProxySandbox。ProxySandbox 支持在同一页面上运行多个微应用，因此称为支持多应用的代理沙箱。未来，LegacySandbox 可能会被淘汰，因为 ProxySandbox 能够实现其所有功能。由于向下兼容的原因，SnapshotSandbox 可能会与 ProxySandbox 长期共存。

## 沙箱极简版

### SnapshotSandbox

&emsp;&emsp;以下代码是 SnapshotSandBox 实现的极简版，快照沙箱的核心逻辑很简单，就是在激活沙箱和沙箱失活的时候各做两件事。

沙箱激活：

- 记录 window 当时的状态（快照）

- 恢复沙箱上次失活时记录的对 window 的状态改变，即在上次沙箱激活期间对 window 所做的修改，现在也保持这些修改。

沙箱失活：

- 记录 window 上有哪些状态发生了变化（沙箱自激活开始，到失活的这段时间）

- 清除沙箱在激活之后在 window 上改变的状态，从代码可以看出，就是让 window 此时的属性状态和刚激活时候的 window 的属性状态进行对比，不同的属性状态就以快照为准，恢复到未改变之前的状态。

```
class SnapshotSandBox {
  windowSnapshot = {};
  modifyPropsMap = {};

  active() {
    for (const prop in window) {
      this.windowSnapshot[prop] = window[prop];
    }

    Object.keys(this.modifyPropsMap).forEach((prop) => {
      window[prop] = this.modifyPropsMap[prop];
    });
  }

  inactive() {
    for (const prop in window) {
      if (window[prop] !== this.windowSnapshot[prop]) {
        this.modifyPropsMap[prop] = window[prop];
        window[prop] = this.windowSnapshot[prop];
      }
    }
  }
}

// 验证:

let snapshotSandBox = new SnapshotSandBox();

snapshotSandBox.active();

window.city = "Beijing";

console.log("window.city-01:", window.city);

snapshotSandBox.inactive();

console.log("window.city-02:", window.city);

snapshotSandBox.active();

console.log("window.city-03:", window.city);

snapshotSandBox.inactive();

// 输出：

// window.city-01: Beijing

// window.city-02: undefined

// window.city-03: Beijing
```

````

从上面可以看出，SnapshotSandbox 存在两个重要的问题：

- 会改变全局 window 的属性，如果同时运行多个微应用，多个应用同时改写 window 上的属性，势必会出现状态混乱，这也就是为什么快照沙箱无法支持多个微应用同时运行的原因。

- 会通过 `for(prop in window){}` 的方式来遍历 window 上的所有属性，window 属性众多，很耗费性能。

### LegacySandbox

以下代码是 LegacySandbox 实现的极简版，LegacySandbox 的核心逻辑就是通过三个变量来记录沙箱激活后 window 发生的变化（addedPropsMapInSandbox、modifiedPropsOriginalValueMapInSandbox、currentUpdatedPropsValueMap）

- addedPropsMapInSandbox：存储在沙箱运行期间新增的 window 属性。使用 Map 对象来记录属性名和对应的值。

- modifiedPropsOriginalValueMapInSandbox：存储在沙箱运行期间被修改的 window 属性及其原始值。用于在沙箱失活时恢复这些属性的原始状态。

- currentUpdatedPropsValueMap：存储当前更新的 window 属性及其值。用于在沙箱激活时应用这些改变。

```javascript
class LegacySandBox {
  addedPropsMapInSandbox = new Map();

  modifiedPropsOriginalValueMapInSandbox = new Map();

  currentUpdatedPropsValueMap = new Map();

  proxyWindow;

  setWindowProp(prop, value, toDelete = false) {
    if (value === undefined && toDelete) {
      delete window[prop];
    } else {
      window[prop] = value;
    }
  }

  active() {
    this.currentUpdatedPropsValueMap.forEach((value, prop) =>
      this.setWindowProp(prop, value)
    );
  }

  inactive() {
    this.modifiedPropsOriginalValueMapInSandbox.forEach((value, prop) =>
      this.setWindowProp(prop, value)
    );

    this.addedPropsMapInSandbox.forEach((_, prop) =>
      this.setWindowProp(prop, undefined, true)
    );
  }

  constructor() {
    const fakeWindow = Object.create(null);

    this.proxyWindow = new Proxy(fakeWindow, {
      set: (target, prop, value, receiver) => {
        const originalVal = window[prop];

        if (!window.hasOwnProperty(prop)) {
          this.addedPropsMapInSandbox.set(prop, value);
        } else if (!this.modifiedPropsOriginalValueMapInSandbox.has(prop)) {
          this.modifiedPropsOriginalValueMapInSandbox.set(prop, originalVal);
        }

        this.currentUpdatedPropsValueMap.set(prop, value);

        window[prop] = value;
      },

      get: (target, prop, receiver) => {
        return target[prop];
      },
    });
  }
}

// 验证：

let legacySandBox = new LegacySandBox();

legacySandBox.active();

legacySandBox.proxyWindow.city = "Beijing";

console.log("window.city-01:", window.city);

legacySandBox.inactive();

console.log("window.city-02:", window.city);

legacySandBox.active();

console.log("window.city-03:", window.city);

legacySandBox.inactive();

// 输出：

// window.city-01: Beijing

// window.city-02: undefined

// window.city-03: Beijing
````

从上面的代码可以看出，其实现的功能和快照沙箱是一模一样的，LegacySandBox 通过 Proxy 拦截对 window 对象的修改，实现一个简单的沙箱机制。记录沙箱运行期间对 window 的新增和修改，并在沙箱激活和失活时应用或恢复这些变化。这样在后续的状态还原时候就不再需要遍历 window 的所有属性来进行对比，提升程序运行的性能。但是这仍然改变不了这种机制仍然污染了 window 的状态的事实，因此也就无法承担起同时支持多个微应用运行的任务。

### ProxySandbox

以下代码是 ProxySandbox 实现的极简版

```javascript
class ProxySandBox {
  proxyWindow;

  isRunning = false;

  active() {
    this.isRunning = true;
  }

  inactive() {
    this.isRunning = false;
  }

  constructor() {
    const fakeWindow = Object.create(null);

    this.proxyWindow = new Proxy(fakeWindow, {
      set: (target, prop, value, receiver) => {
        if (this.isRunning) {
          target[prop] = value;
        }
      },

      get: (target, prop, receiver) => {
        return prop in target ? target[prop] : window[prop];
      },
    });
  }
}

// 验证：

let proxySandBox1 = new ProxySandBox();

let proxySandBox2 = new ProxySandBox();

proxySandBox1.active();

proxySandBox2.active();

proxySandBox1.proxyWindow.city = "Beijing";

proxySandBox2.proxyWindow.city = "Shanghai";

console.log(
  "active:proxySandBox1:window.city:",
  proxySandBox1.proxyWindow.city
);

console.log(
  "active:proxySandBox2:window.city:",
  proxySandBox2.proxyWindow.city
);

console.log("window:window.city:", window.city);

proxySandBox1.inactive();

proxySandBox2.inactive();

console.log(
  "inactive:proxySandBox1:window.city:",
  proxySandBox1.proxyWindow.city
);

console.log(
  "inactive:proxySandBox2:window.city:",
  proxySandBox2.proxyWindow.city
);

console.log("window:window.city:", window.city);

// 输出：

// active:proxySandBox1:window.city: Beijing

// active:proxySandBox2:window.city: Shanghai

// window:window.city: undefined

// inactive:proxySandBox1:window.city: Beijing

// inactive:proxySandBox2:window.city: Shanghai

// window:window.city: undefined
```

从上述代码可以看出，ProxySandbox 并不包含状态恢复的逻辑，也无需记录属性值的变化，因为所有的更改都发生在沙箱内部，与 window 无关，window 上的属性始终不受影响。其缺点是无法阻止自执行函数对 window 的直接修改。此外，由于 Proxy 是 ES6 的新特性，不兼容低版本浏览器，因此 SnapshotSandbox 将会长期存在。

## qiankun 沙箱源码分析

### SnapshotSandbox 源码解析

沙箱类图如下：

![SnapshotSandbox 类图](snapshot-sandbox-class-diagram.png)

沙箱逻辑如下：

1. 创建实例：首先创建一个 SnapshotSandbox 实例。

2. 激活沙箱：

- 记录当前 window 对象的状态作为快照（纯净的 window 状态）。

- 恢复沙箱运行时对 window 对象的修改（修改的属性通过 modifyPropsMap 还原，删除的属性通过 deletePropsSet 删除）。

- 将 sandboxRunning 标志设置为 true，表示沙箱正在运行。

3. 停用沙箱：

- 清空 modifyPropsMap 以及 deletePropsSet。

- 恢复 window 至快照状态（恢复是通过遍历当前状态和快照状态时的区别，若是属性不同得记录在 modifyPropsMap 里，若是被删除的属性则记录在 deletePropsSet 以便激活时使用）。

- 将 sandboxRunning 标志设置为 false，表示沙箱已停止运行。

```javascript

/**

* @author Hydrogen

* @since 2020-3-8

*/

import type { SandBox } from '../interfaces';

import { SandBoxType } from '../interfaces';

function iter(obj: typeof window | Record<any, any>, callbackFn: (prop: any) => void) {

// eslint-disable-next-line guard-for-in, no-restricted-syntax

for (const prop in obj) {

// patch for clearInterval for compatible reason, see #1490

if (obj.hasOwnProperty(prop) || prop === 'clearInterval') {

callbackFn(prop);

}

}

}

/**

* 基于 diff 方式实现的沙箱，用于不支持 Proxy 的低版本浏览器

*/

export default class SnapshotSandbox implements SandBox {

proxy: WindowProxy;

name: string;

type: SandBoxType;

sandboxRunning = true;

private windowSnapshot!: Window;

private modifyPropsMap: Record<any, any> = {};

private deletePropsSet: Set<any> = new Set();

constructor(name: string) {

this.name = name;

this.proxy = window;

this.type = SandBoxType.Snapshot;

}

active() {

// 记录当前快照

this.windowSnapshot = {} as Window;

iter(window, (prop) => {

this.windowSnapshot[prop] = window[prop];

});

// 恢复之前的变更

Object.keys(this.modifyPropsMap).forEach((p: any) => {

window[p] = this.modifyPropsMap[p];

});

// 删除之前删除的属性

this.deletePropsSet.forEach((p: any) => {

delete window[p];

});

this.sandboxRunning = true;

}

inactive() {

this.modifyPropsMap = {};

this.deletePropsSet.clear();

iter(window, (prop) => {

if (window[prop] !== this.windowSnapshot[prop]) {

// 记录变更，恢复环境

this.modifyPropsMap[prop] = window[prop];

window[prop] = this.windowSnapshot[prop];

}

});

iter(this.windowSnapshot, (prop) => {

if (!window.hasOwnProperty(prop)) {

// 记录被删除的属性，恢复环境

this.deletePropsSet.add(prop);

window[prop] = this.windowSnapshot[prop];

}

});

if (process.env.NODE_ENV === 'development') {

console.info(

`[qiankun:sandbox] ${this.name} origin window restore...`,

Object.keys(this.modifyPropsMap),

this.deletePropsSet.keys(),

);

}

this.sandboxRunning = false;

}

patchDocument(): void {}

}

```

### LegacySandbox 源码解析

沙箱类图如下：

![LegacySandbox 类图](legacy-sandbox-class-diagram.png)

沙箱逻辑图如下：

![LegacySandbox 逻辑图](legacy-sandbox-logic-diagram.png)

1. 创建实例：初始化一个 LegacySandbox 实例，准备沙箱环境。

2. 激活沙箱：

- 将 currentUpdatedPropsValueMap 的值应用到 window，以恢复沙箱内的修改。

- 设置 sandboxRunning 为 true，表示沙箱正在运行。

3. 停用沙箱：

- 使用 `modifiedPropsOriginalValueMapInSandbox` 恢复 `window` 的原始值。
- 删除通过 `addedPropsMapInSandbox` 记录的新增属性。
- 设置 `sandboxRunning` 为 `false`，表示沙箱已停止运行。

```javascript
/**
 * @author Kuitos
 * @since 2019-04-11
 */
import type { SandBox } from '../../interfaces';
import { SandBoxType } from '../../interfaces';
import { rebindTarget2Fn } from '../common';

function isPropConfigurable(target: WindowProxy, prop: PropertyKey) {
  const descriptor = Object.getOwnPropertyDescriptor(target, prop);
  return descriptor ? descriptor.configurable : true;
}

/**
 * 基于 Proxy 实现的沙箱
 * TODO: 为了兼容性 singular 模式下依旧使用该沙箱，等新沙箱稳定之后再切换
 */
export default class LegacySandbox implements SandBox {
  /** 沙箱期间新增的全局变量 */
  private addedPropsMapInSandbox = new Map<PropertyKey, any>();

  /** 沙箱期间更新的全局变量 */
  private modifiedPropsOriginalValueMapInSandbox = new Map<PropertyKey, any>();

  /** 持续记录更新的(新增和修改的)全局变量的 map，用于在任意时刻做 snapshot */
  private currentUpdatedPropsValueMap = new Map<PropertyKey, any>();

  name: string;

  proxy: WindowProxy;

  globalContext: typeof window;

  type: SandBoxType;

  sandboxRunning = true;

  latestSetProp: PropertyKey | null = null;

  private setWindowProp(prop: PropertyKey, value: any, toDelete?: boolean) {
    if (value === undefined && toDelete) {
      // eslint-disable-next-line no-param-reassign
      delete (this.globalContext as any)[prop];
    } else if (isPropConfigurable(this.globalContext, prop) && typeof prop !== 'symbol') {
      Object.defineProperty(this.globalContext, prop, { writable: true, configurable: true });
      // eslint-disable-next-line no-param-reassign
      (this.globalContext as any)[prop] = value;
    }
  }

  active() {
    if (!this.sandboxRunning) {
      this.currentUpdatedPropsValueMap.forEach((v, p) => this.setWindowProp(p, v));
    }

    this.sandboxRunning = true;
  }

  inactive() {
    if (process.env.NODE_ENV === 'development') {
      console.info(`[qiankun:sandbox] ${this.name} modified global properties restore...`, [
        ...this.addedPropsMapInSandbox.keys(),
        ...this.modifiedPropsOriginalValueMapInSandbox.keys(),
      ]);
    }

    // renderSandboxSnapshot = snapshot(currentUpdatedPropsValueMapForSnapshot);
    // restore global props to initial snapshot
    this.modifiedPropsOriginalValueMapInSandbox.forEach((v, p) => this.setWindowProp(p, v));
    this.addedPropsMapInSandbox.forEach((_, p) => this.setWindowProp(p, undefined, true));

    this.sandboxRunning = false;
  }

  constructor(name: string, globalContext = window) {
    this.name = name;
    this.globalContext = globalContext;
    this.type = SandBoxType.LegacyProxy;
    const { addedPropsMapInSandbox, modifiedPropsOriginalValueMapInSandbox, currentUpdatedPropsValueMap } = this;

    const rawWindow = globalContext;
    const fakeWindow = Object.create(null) as Window;

    const setTrap = (p: PropertyKey, value: any, originalValue: any, sync2Window = true) => {
      if (this.sandboxRunning) {
        if (!rawWindow.hasOwnProperty(p)) {
          addedPropsMapInSandbox.set(p, value);
        } else if (!modifiedPropsOriginalValueMapInSandbox.has(p)) {
          // 如果当前 window 对象存在该属性，且 record map 中未记录过，则记录该属性初始值
          modifiedPropsOriginalValueMapInSandbox.set(p, originalValue);
        }

        currentUpdatedPropsValueMap.set(p, value);

        if (sync2Window) {
          // 必须重新设置 window 对象保证下次 get 时能拿到已更新的数据
          (rawWindow as any)[p] = value;
        }

        this.latestSetProp = p;

        return true;
      }

      if (process.env.NODE_ENV === 'development') {
        console.warn(`[qiankun] Set window.${p.toString()} while sandbox destroyed or inactive in ${name}!`);
      }

      // 在 strict-mode 下，Proxy 的 handler.set 返回 false 会抛出 TypeError，在沙箱卸载的情况下应该忽略错误
      return true;
    };

    const proxy = new Proxy(fakeWindow, {
      set: (_: Window, p: PropertyKey, value: any): boolean => {
        const originalValue = (rawWindow as any)[p];
        return setTrap(p, value, originalValue, true);
      },

      get(_: Window, p: PropertyKey): any => {
        // avoid who using window.window or window.self to escape the sandbox environment to touch the really window
        // or use window.top to check if an iframe context
        // see https://github.com/eligrey/FileSaver.js/blob/master/src/FileSaver.js#L13
        if (p === 'top' || p === 'parent' || p === 'window' || p === 'self') {
          return proxy;
        }

        const value = (rawWindow as any)[p];
        return rebindTarget2Fn(rawWindow, value);
      },

      // trap in operator
      // see https://github.com/styled-components/styled-components/blob/master/packages/styled-components/src/constants.js#L12
      has(_: Window, p: string | number | symbol): boolean {
        return p in rawWindow;
      },

      getOwnPropertyDescriptor(_: Window, p: PropertyKey): PropertyDescriptor | undefined {
        const descriptor = Object.getOwnPropertyDescriptor(rawWindow, p);
        // A property cannot be reported as non-configurable, if it does not exists as an own property of the target object
        if (descriptor && !descriptor.configurable) {
          descriptor.configurable = true;
        }
        return descriptor;
      },

      defineProperty(_: Window, p: string | symbol, attributes: PropertyDescriptor): boolean {
        const originalValue = (rawWindow as any)[p];
        const done = Reflect.defineProperty(rawWindow, p, attributes);
        const value = (rawWindow as any)[p];
        setTrap(p, value, originalValue, false);

        return done;
      },
    });

    this.proxy = proxy;
  }

  patchDocument(): void {}
}
```

### ProxySandbox 源码解析

ProxySandbox 是 qiankun 最新的沙箱实现，支持多个微应用同时运行。其核心特点是：

- **不污染全局 window**：所有修改都发生在代理对象内部
- **性能最优**：无需记录和恢复属性
- **支持多应用**：可以同时运行多个微应用

```javascript
/* eslint-disable no-param-reassign */
/**
 * @author Kuitos
 * @since 2020-3-31
 */
import { without } from 'lodash';
import type { SandBox } from '../interfaces';
import { SandBoxType } from '../interfaces';
import { isPropertyFrozen, nativeGlobal, nextTask } from '../utils';
import { clearCurrentRunningApp, getCurrentRunningApp, rebindTarget2Fn, setCurrentRunningApp } from './common';
import { globalsInBrowser, globalsInES2015 } from './globals';

type SymbolTarget = 'target' | 'globalContext';

type FakeWindow = Window & Record<PropertyKey, any>;

/**
 * fastest(at most time) unique array method
 * @see https://jsperf.com/array-filter-unique/30
 */
function uniq(array: Array<string | symbol>) {
  return array.filter(function filter(this: PropertyKey[], element) {
    return element in this ? false : ((this as any)[element] = true);
  }, Object.create(null));
}

/**
 * transform array to object to enable faster element check with in operator
 * @param array
 */
function array2TruthyObject(array: string[]): Record<string, true> {
  return array.reduce(
    (acc, key) => {
      acc[key] = true;
      return acc;
    },
    Object.create(null),
  );
}

const cachedGlobalsInBrowser = array2TruthyObject(
  globalsInBrowser.concat(process.env.NODE_ENV === 'test' ? ['mockNativeWindowFunction'] : []),
);

function isNativeGlobalProp(prop: string): boolean {
  return prop in cachedGlobalsInBrowser;
}

// zone.js will overwrite Object.defineProperty
const rawObjectDefineProperty = Object.defineProperty;

const variableWhiteListInDev =
  process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development' || window.__QIANKUN_DEVELOPMENT__
    ? [
        // for react hot reload
        // see https://github.com/facebook/create-react-app/blob/66bf7dfc43350249e2f09d138a20840dae8a0a4a/packages/react-error-overlay/src/index.js#L180
        '__REACT_ERROR_OVERLAY_GLOBAL_HOOK__',
        // for react development event issue, see https://github.com/umijs/qiankun/issues/2375
        'event',
      ]
    : [];

// who could escape the sandbox
const globalVariableWhiteList: string[] = [
  // FIXME System.js used a indirect call with eval, which would make it scope escape to global
  // To make System.js works well, we write it back to global window temporary
  // see https://github.com/systemjs/systemjs/blob/457f5b7e8af6bd120a279540477552a07d5de086/src/evaluate.js#L106
  'System',

  // see https://github.com/systemjs/systemjs/blob/457f5b7e8af6bd120a279540477552a07d5de086/src/instantiate.js#L357
  '__cjsWrapper',
  ...variableWhiteListInDev,
];

const inTest = process.env.NODE_ENV === 'test';
const mockSafariTop = 'mockSafariTop';
const mockTop = 'mockTop';
const mockGlobalThis = 'mockGlobalThis';

// these globals should be recorded while accessing every time
const accessingSpiedGlobals = ['document', 'top', 'parent', 'eval'];
const overwrittenGlobals = ['window', 'self', 'globalThis', 'hasOwnProperty'].concat(inTest ? [mockGlobalThis] : []);
export const cachedGlobals = Array.from(
  new Set(
    without(globalsInES2015.concat(overwrittenGlobals).concat('requestAnimationFrame'), ...accessingSpiedGlobals),
  ),
);

const cachedGlobalObjects = array2TruthyObject(cachedGlobals);

/*
 Variables who are impossible to be overwritten need to be escaped from proxy sandbox for performance reasons.
 But overwritten globals must not be escaped, otherwise they will be leaked to the global scope.
 see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/unscopables
 */
const unscopables = array2TruthyObject(without(cachedGlobals, ...accessingSpiedGlobals.concat(overwrittenGlobals)));

const useNativeWindowForBindingsProps = new Map<PropertyKey, boolean>([
  ['fetch', true],
  ['mockDomAPIInBlackList', process.env.NODE_ENV === 'test'],
]);

function createFakeWindow(globalContext: Window, speedy: boolean) {
  // map always has the fastest performance in has checked scenario
  // see https://jsperf.com/array-indexof-vs-set-has/23
  const propertiesWithGetter = new Map<PropertyKey, boolean>();
  const fakeWindow = {} as FakeWindow;

  /*
   copy the non-configurable property of global to fakeWindow
   see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/getOwnPropertyDescriptor
   > A property cannot be reported as non-configurable, if it does not exist as an own property of the target object or if it exists as a configurable own property of the target object.
   */
  Object.getOwnPropertyNames(globalContext)
    .filter((p) => {
      const descriptor = Object.getOwnPropertyDescriptor(globalContext, p);
      return !descriptor?.configurable;
    })
    .forEach((p) => {
      const descriptor = Object.getOwnPropertyDescriptor(globalContext, p);
      if (descriptor) {
        // 访问器属性
        const hasGetter = Object.prototype.hasOwnProperty.call(descriptor, 'get');

        /*
         make top/self/window property configurable and writable, otherwise it will cause TypeError while get trap return.
         see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/get
         > The value reported for a property must be the same as the value of the corresponding target object property if the target object property is a non-writable, non-configurable data property.
         */
        if (
          p === 'top' ||
          p === 'parent' ||
          p === 'self' ||
          p === 'window' ||
          // window.document is overwriting in speedy mode
          (p === 'document' && speedy) ||
          (inTest && (p === mockTop || p === mockSafariTop))
        ) {
          descriptor.configurable = true;
          /*
           The descriptor of window.window/window.top/window.self in Safari/FF are accessor descriptors, we need to avoid adding a data descriptor while it was
           Example:
            Safari/FF: Object.getOwnPropertyDescriptor(window, 'top') -> {get: function, set: undefined, enumerable: true, configurable: false}
            Chrome: Object.getOwnPropertyDescriptor(window, 'top') -> {value: Window, writable: false, enumerable: true, configurable: false}
           */
          if (!hasGetter) {
            descriptor.writable = true;
          }
        }

        if (hasGetter) propertiesWithGetter.set(p, true);

        // freeze the descriptor to avoid being modified by zone.js
        // see https://github.com/angular/zone.js/blob/a5fe09b0fac27ac5df1fa746042f96f05ccb6a00/lib/browser/define-property.ts#L71
        rawObjectDefineProperty(fakeWindow, p, Object.freeze(descriptor));
      }
    });

  return {
    fakeWindow,
    propertiesWithGetter,
  };
}

let activeSandboxCount = 0;

/**
 * 基于 Proxy 实现的沙箱
 */
export default class ProxySandbox implements SandBox {
  /** window 值变更记录 */
  private updatedValueSet = new Set<PropertyKey>();
  private document = document;
  name: string;
  type: SandBoxType;
  proxy: WindowProxy;
  sandboxRunning = true;
  latestSetProp: PropertyKey | null = null;

  active() {
    // 应该是一个运行的沙箱有一个proxySandbox，这个是记录当前运行了多少个沙箱
    if (!this.sandboxRunning) activeSandboxCount++;
    this.sandboxRunning = true;
  }

  inactive() {
    if (process.env.NODE_ENV === 'development') {
      console.info(`[qiankun:sandbox] ${this.name} modified global properties restore...`, [
        ...this.updatedValueSet.keys(),
      ]);
    }
    // 如果是在测试环境下，或是当前没有沙箱在运行的情况下，将属性还原
    if (inTest || --activeSandboxCount === 0) {
      // reset the global value to the prev value
      Object.keys(this.globalWhitelistPrevDescriptor).forEach((p) => {
        const descriptor = this.globalWhitelistPrevDescriptor[p];
        if (descriptor) {
          Object.defineProperty(this.globalContext, p, descriptor);
        } else {
          // @ts-ignore
          delete this.globalContext[p];
        }
      });
    }

    this.sandboxRunning = false;
  }

  public patchDocument(doc: Document) {
    this.document = doc;
  }

  // the descriptor of global variables in whitelist before it been modified
  globalWhitelistPrevDescriptor: { [p in (typeof globalVariableWhiteList)[number]]: PropertyDescriptor | undefined } =
    {};
  globalContext: typeof window;

  constructor(name: string, globalContext = window, opts?: { speedy: boolean }) {
    this.name = name;
    this.globalContext = globalContext;
    this.type = SandBoxType.Proxy;
    const { updatedValueSet } = this;
    const { speedy } = opts || {};
    const { fakeWindow, propertiesWithGetter } = createFakeWindow(globalContext, !!speedy);

    const descriptorTargetMap = new Map<PropertyKey, SymbolTarget>();

    const proxy = new Proxy(fakeWindow, {
      set: (target: FakeWindow, p: PropertyKey, value: any): boolean => {
        if (this.sandboxRunning) {
          this.registerRunningApp(name, proxy);

          // sync the property to globalContext
          // 修改全局window的一些属性
          if (typeof p === 'string' && globalVariableWhiteList.indexOf(p) !== -1) {
            this.globalWhitelistPrevDescriptor[p] = Object.getOwnPropertyDescriptor(globalContext, p);
            // @ts-ignore
            globalContext[p] = value;
          } else {
            // We must keep its description while the property existed in globalContext before
            if (!target.hasOwnProperty(p) && globalContext.hasOwnProperty(p)) {
              const descriptor = Object.getOwnPropertyDescriptor(globalContext, p);
              const { writable, configurable, enumerable, set } = descriptor!;
              // only writable property can be overwritten
              // here we ignored accessor descriptor of globalContext as it makes no sense to trigger its logic(which might make sandbox escaping instead)
              // we force to set value by data descriptor
              if (writable || set) {
                // 属性改成数据属性，数据属性的性能相对访问器来说好点
                Object.defineProperty(target, p, { configurable, enumerable, writable: true, value });
              }
            } else {
              target[p] = value;
            }
          }

          updatedValueSet.add(p);

          this.latestSetProp = p;

          return true;
        }

        if (process.env.NODE_ENV === 'development') {
          console.warn(`[qiankun] Set window.${p.toString()} while sandbox destroyed or inactive in ${name}!`);
        }

        // 在 strict-mode 下，Proxy 的 handler.set 返回 false 会抛出 TypeError，在沙箱卸载的情况下应该忽略错误
        return true;
      },

      get: (target: FakeWindow, p: PropertyKey): any => {
        this.registerRunningApp(name, proxy);

        if (p === Symbol.unscopables) return unscopables;
        // avoid who using window.window or window.self to escape the sandbox environment to touch the real window
        // see https://github.com/eligrey/FileSaver.js/blob/master/src/FileSaver.js#L13
        if (p === 'window' || p === 'self') {
          return proxy;
        }

        // hijack globalWindow accessing with globalThis keyword
        if (p === 'globalThis' || (inTest && p === mockGlobalThis)) {
          return proxy;
        }

        if (p === 'top' || p === 'parent' || (inTest && (p === mockTop || p === mockSafariTop))) {
          // if your master app in an iframe context, allow these props escape the sandbox
          if (globalContext === globalContext.parent) {
            return proxy;
          }
          return (globalContext as any)[p];
        }

        // proxy.hasOwnProperty would invoke getter firstly, then its value represented as globalContext.hasOwnProperty
        if (p === 'hasOwnProperty') {
          return hasOwnProperty;
        }

        if (p === 'document') {
          return this.document;
        }

        if (p === 'eval') {
          return eval;
        }

        if (p === 'string' && globalVariableWhiteList.indexOf(p) !== -1) {
          // @ts-ignore
          return globalContext[p];
        }

        const actualTarget = propertiesWithGetter.has(p) ? globalContext : p in target ? target : globalContext;
        const value = actualTarget[p];

        // frozen value should return directly, see https://github.com/umijs/qiankun/issues/2015
        if (isPropertyFrozen(actualTarget, p)) {
          return value;
        }

        // non-native property return directly to avoid rebind
        if (!isNativeGlobalProp(p as string) && !useNativeWindowForBindingsProps.has(p)) {
          return value;
        }

        /* Some dom api must be bound to native window, otherwise it would cause exception like 'TypeError: Failed to execute 'fetch' on 'Window': Illegal invocation'
           See this code:
             const proxy = new Proxy(window, {});
             // in nest sandbox fetch will be bind to proxy rather than window in master
             const proxyFetch = fetch.bind(proxy);
             proxyFetch('https://qiankun.com');
        */
        const boundTarget = useNativeWindowForBindingsProps.get(p) ? nativeGlobal : globalContext;
        return rebindTarget2Fn(boundTarget, value);
      },

      // trap in operator
      // see https://github.com/styled-components/styled-components/blob/master/packages/styled-components/src/constants.js#L12
      has(target: FakeWindow, p: string | number | symbol): boolean {
        // property in cachedGlobalObjects must return true to avoid escape from get trap
        return p in cachedGlobalObjects || p in target || p in globalContext;
      },

      getOwnPropertyDescriptor(target: FakeWindow, p: string | number | symbol): PropertyDescriptor | undefined {
        /*
         as the descriptor of top/self/window/mockTop in raw window are configurable but not in proxy target, we need to get it from target to avoid TypeError
         see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/getOwnPropertyDescriptor
         > A property cannot be reported as non-configurable, if it does not exist as an own property of the target object or if it exists as a configurable own property of the target object.
         */
        if (target.hasOwnProperty(p)) {
          const descriptor = Object.getOwnPropertyDescriptor(target, p);
          descriptorTargetMap.set(p, 'target');
          return descriptor;
        }

        if (globalContext.hasOwnProperty(p)) {
          const descriptor = Object.getOwnPropertyDescriptor(globalContext, p);
          descriptorTargetMap.set(p, 'globalContext');
          // A property cannot be reported as non-configurable, if it does not exist as an own property of the target object
          if (descriptor && !descriptor.configurable) {
            descriptor.configurable = true;
          }
          return descriptor;
        }

        return undefined;
      },

      // trap to support iterator with sandbox
      ownKeys(target: FakeWindow): ArrayLike<string | symbol> {
        return uniq(Reflect.ownKeys(globalContext).concat(Reflect.ownKeys(target)));
      },

      defineProperty: (target: Window, p: PropertyKey, attributes: PropertyDescriptor): boolean => {
        const from = descriptorTargetMap.get(p);
        /*
         Descriptor must be defined to native window while it comes from native window via Object.getOwnPropertyDescriptor(window, p),
         otherwise it would cause a TypeError with illegal invocation.
         */
        switch (from) {
          case 'globalContext':
            return Reflect.defineProperty(globalContext, p, attributes);
          default:
            return Reflect.defineProperty(target, p, attributes);
        }
      },

      deleteProperty: (target: FakeWindow, p: string | number | symbol): boolean => {
        this.registerRunningApp(name, proxy);
        if (target.hasOwnProperty(p)) {
          // @ts-ignore
          delete target[p];
          updatedValueSet.delete(p);

          return true;
        }

        return true;
      },

      // makes sure `window instanceof Window` returns truthy in micro app
      getPrototypeOf() {
        return Reflect.getPrototypeOf(globalContext);
      },
    });

    this.proxy = proxy;

    activeSandboxCount++;

    function hasOwnProperty(this: any, key: PropertyKey): boolean {
      // calling from hasOwnProperty.call(obj, key)
      if (this !== proxy && this !== null && typeof this === 'object') {
        return Object.prototype.hasOwnProperty.call(this, key);
      }

      return fakeWindow.hasOwnProperty(key) || globalContext.hasOwnProperty(key);
    }
  }

  private registerRunningApp(name: string, proxy: Window) {
    if (this.sandboxRunning) {
      const currentRunningApp = getCurrentRunningApp();
      if (!currentRunningApp || currentRunningApp.name !== name) {
        setCurrentRunningApp({ name, window: proxy });
      }
      // FIXME if you have any other good ideas
      // remove the mark in next tick, thus we can identify whether it in micro app or not
      // this approach is just a workaround, it could not cover all complex cases, such as the micro app runs in the same task context with master in some case
      nextTask(clearCurrentRunningApp);
    }
  }
}
```

## 微应用加载流程分析

### import-html-entry

`import-html-entry` 是 qiankun 用来加载和解析微应用 HTML 的核心库。它负责：

1. 获取 HTML 资源
2. 解析 HTML 中的脚本和样式
3. 提供执行脚本的方法

**核心方法**：

- `importHTML(url, opts)` - 加载并解析 HTML
- `execScripts(entry, scripts, proxy, opts)` - 在沙箱中执行脚本

**execScripts 核心实现**：

```javascript
function getExecutableScript(scriptSrc, scriptText, opts = {}) {
  const { proxy, strictGlobal, scopedGlobalVariables = [] } = opts;
  const sourceUrl = isInlineCode(scriptSrc) ? "" : `//# sourceURL=${scriptSrc}\n`;
  const scopedGlobalVariableDefinition = scopedGlobalVariables.length ? `const {${scopedGlobalVariables.join(",")}}=this;` : "";
  const globalWindow = (0, eval)("window");
  globalWindow.proxy = proxy;
  // 在这里通过with来进行隔离
  return strictGlobal ? scopedGlobalVariableDefinition ? `;(function(){with(this){${scopedGlobalVariableDefinition}${scriptText}\n${sourceUrl}}}).bind(window.proxy)();` : `;(function(window, self, globalThis){with(window){;${scriptText}\n${sourceUrl}}}).bind(window.proxy)(window.proxy, window.proxy, window.proxy);` : `;(function(window, self, globalThis){;${scriptText}\n${sourceUrl}}).bind(window.proxy)(window.proxy, window.proxy, window.proxy);`;
}
```

**关键点**：
- 使用 `with` 语句将代码执行上下文绑定到沙箱代理对象
- 通过 `bind(window.proxy)` 将 `this` 指向沙箱代理
- 这是 qiankun JS 隔离的核心实现

### loadApp 加载流程

`loadApp` 是 qiankun 加载微应用的主要函数，流程如下：

1. **导入 HTML 资源** - 调用 `importEntry` 获取 HTML、脚本和样式
2. **等待前一个应用卸载** - 确保应用卸载完成
3. **创建应用容器** - 生成 DOM 容器
4. **CSS 隔离** - 根据配置应用 CSS 隔离方案
5. **设置沙箱** - 创建 JS 沙箱
6. **执行生命周期** - 执行 beforeLoad、bootstrap、mount 等钩子
7. **返回应用配置** - 返回包含生命周期的应用配置

**CSS 隔离实现**：

```javascript
function createElement(
  appContent: string,
  strictStyleIsolation: boolean,
  scopedCSS: boolean,
  appInstanceId: string,
): HTMLElement {
  const containerElement = document.createElement('div');
  containerElement.innerHTML = appContent;
  // appContent always wrapped with a singular div
  const appElement = containerElement.firstChild as HTMLElement;
  if (strictStyleIsolation) {
    if (!supportShadowDOM) {
      console.warn(
        '[qiankun]: As current browser not support shadow dom, your strictStyleIsolation configuration will be ignored!',
      );
    } else {
      const { innerHTML } = appElement;
      appElement.innerHTML = '';
      let shadow: ShadowRoot;

      if (appElement.attachShadow) {
        shadow = appElement.attachShadow({ mode: 'open' });
      } else {
        // createShadowRoot was proposed in initial spec, which has then been deprecated
        shadow = (appElement as any).createShadowRoot();
      }
      shadow.innerHTML = innerHTML;
    }
  }

  if (scopedCSS) {
    const attr = appElement.getAttribute(css.QiankunCSSRewriteAttr);
    if (!attr) {
      appElement.setAttribute(css.QiankunCSSRewriteAttr, appInstanceId);
    }

    const styleNodes = appElement.querySelectorAll('style') || [];
    forEach(styleNodes, (stylesheetElement: HTMLStyleElement) => {
      css.process(appElement!, stylesheetElement, appInstanceId);
    });
  }

  return appElement;
}
```

**CSS 隔离方案**：
- **strictStyleIsolation** - 使用 Shadow DOM 完全隔离样式
- **scopedCSS** - 通过给选择器添加前缀来隔离样式

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

```

```

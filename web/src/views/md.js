export default `
## 防抖
我们从这个场景为前提开始进行防抖的探索

\`\`\`javascript
const debounce = (func, wait, ...args) => {
    let timeout
    return function() {
        const context = this
        if (timeout) {
            clearTimeout(timeout)
        }
        timeout = setTimeout(() => {
            func.apply(context, args)
        }, wait)
    }
}
\`\`\`
`
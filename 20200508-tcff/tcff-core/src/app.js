import invariant from 'invariant'
import Application from './application'
import window from 'global/window'

export let globalApp = window.__tcffApp // 保证单例，待商榷

export function createApp () {
  if (globalApp == null) {
    globalApp = new Application()
    window.__tcffApp = globalApp
  }
  return globalApp
}

export function getApp () {
  return globalApp
}

export function resetApp () {
  globalApp = null
  createApp()
  return globalApp
}

export function useGlobalExtendPlugin (target, name) {
  globalApp.use((app, options) => {
    return {
      namespace: name,
      register: {
        feature: {
          name,
          test (options) {
            return !!options[name]
          },
          mount (plugin, options) {
            invariant(!!options.namespace, `global-extend plugin must be have 'namespace' field`)
            target[options.namespace] = options[name]
          },
          unmount (plugin, options) {
            delete target[options.namespace]
          }
        }
      }
    }
  })
}

createApp()

export const mapper = {}
useGlobalExtendPlugin(mapper, 'mapper')

export const selector = {}
useGlobalExtendPlugin(selector, 'selector')

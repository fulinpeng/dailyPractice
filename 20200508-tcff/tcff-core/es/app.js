import invariant from 'invariant';
import Application from './application';
import window from 'global/window';

export var globalApp = window.__tcffApp; // 保证单例，待商榷

export function createApp() {
  if (globalApp == null) {
    globalApp = new Application();
    window.__tcffApp = globalApp;
  }
  return globalApp;
}

export function getApp() {
  return globalApp;
}

export function resetApp() {
  globalApp = null;
  createApp();
  return globalApp;
}

export function useGlobalExtendPlugin(target, name) {
  globalApp.use(function (app, options) {
    return {
      namespace: name,
      register: {
        feature: {
          name: name,
          test: function test(options) {
            return !!options[name];
          },
          mount: function mount(plugin, options) {
            invariant(!!options.namespace, 'global-extend plugin must be have \'namespace\' field');
            target[options.namespace] = options[name];
          },
          unmount: function unmount(plugin, options) {
            delete target[options.namespace];
          }
        }
      }
    };
  });
}

createApp();

export var mapper = {};
useGlobalExtendPlugin(mapper, 'mapper');

export var selector = {};
useGlobalExtendPlugin(selector, 'selector');
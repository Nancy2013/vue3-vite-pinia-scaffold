import { resolve } from "path";
import { fileURLToPath, URL } from 'node:url'
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { createStyleImportPlugin, VantResolve } from "vite-plugin-style-import";
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { svgModule } from "./config/svgModule";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    Components({
      resolvers: [AntDesignVueResolver({ importStyle: 'less' })]
    }),
    createStyleImportPlugin({
      libs: [
        {
          libraryName: "ant-design-vue",
          esModule: true,
          resolveStyle: (name) => {
            return resolve(
              __dirname,
              `node_modules/ant-design-vue/es/${name}/style/index`
            );
          },
        },
      ],
    }),
    svgModule("./src/assets/svg/"),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import '@/assets/css/base.less';`
        },
        javascriptEnabled: true,
      },
    },
  },
  server: {
    proxy: {
      // http://192.168.110.40:48081/
      "/api": {
        target: "https://xi.cn88555.com/api",   // "https://xi.cn88555.com/api", // http://116.147.41.117/api
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
    fs: { strict: false },
  }
})

import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import type { ConfigEnv, ProxyOptions, UserConfig } from 'vite'
import { loadEnv } from 'vite'
import postCssPxToRem from "postcss-pxtorem";

const pathResolve = (dir: string): any => {
    return resolve(__dirname, '.', dir)
}

const viteConfig = ({ mode }: ConfigEnv): UserConfig => {
    const { VITE_PORT, VITE_OPEN, VITE_BASE_PATH, VITE_OUT_DIR, VITE_PROXY_URL } = loadEnv(mode, process.cwd())

    const alias: Record<string, string> = {
        '@': pathResolve('./src/'),
        assets: pathResolve('./src/assets'),
    }

    let proxy: Record<string, string | ProxyOptions> = {}
    if (VITE_PROXY_URL) {
        proxy = {
            '/': {
                target: VITE_PROXY_URL,
                changeOrigin: true,
            },
        }
    }

    return {
        plugins: [vue()],
        root: process.cwd(),
        resolve: { alias },
        base: VITE_BASE_PATH,
        css:{
            postcss:{
                plugins:[
                    postCssPxToRem({
                        rootValue ({ file }) {
                            // return file.indexOf('vant') !== -1 ? 37.5 : 75
                            return 37.5
                          },
                          propList: ["*","!border"]
                      })
                ]
            }
        },
        server: {
            port: parseInt(VITE_PORT),
            open: VITE_OPEN != 'false',
            proxy: proxy,
        },
        build: {
            cssCodeSplit: false,
            sourcemap: false,
            outDir: VITE_OUT_DIR,
            emptyOutDir: true,
            chunkSizeWarningLimit: 1500,
            rollupOptions: {
                output: {
                    manualChunks: {
                        vue: ['vue', 'vue-router'],
                        // echarts: ['echarts'],
                    },
                    entryFileNames: `assets/[name].[hash]${new Date().getTime()}.js`,
                    chunkFileNames: `assets/[name].[hash]${new Date().getTime()}.js`,
                    assetFileNames: `assets/[name].[hash]${new Date().getTime()}.[ext]`,
                },
            },
        },
    }
}

export default viteConfig

//使用webpack2 新增import 方法 来实现按需加载
//使用 bable-pluginsyntax-dynamic 来解析import 语法
import Root from "app/components/Root"

const loadComponent = ( importor, name = 'default' ) => (location,cb)=>{
    importor.then((module)=>{
        console.info(`动态路由加载成功!`)
        cb(null,module[name])
    })
    .catch((err)=>{
        console.debug(`动态路由加载失败:${err}`)
    })
}

export default {
    path: "/",
    component: Root,
    indexRoute: {
        getComponent:loadComponent(System.import('home'))
    },    
    childRoutes: [
        {
            path:"home",
            getComponent:loadComponent(System.import('home'))
        },
    ]
}


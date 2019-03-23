//菜单数据的配置。

const MeunData = [
    {
        name:"数据概况",
        route: '/',
        iconType:'line-chart',
        children:[]
    },{
        name:'权限管理',
        route:'/rightsManagement',
        iconType:'lock',
        children:[]
    },{
        name:"用户管理",
        route:"/userManagement",
        iconType:'user',
        children:[
            {
                name:"普通用户",
                route:"/normalUser",
            },{
                name:"内部人员",
                route:"/internalPerson"
            }
        ]
    },{
        name:"文章管理",
        route:"/articleManagement",
        iconType:"file-text",
        children:[]
    },{
        name:"资源管理",
        route:"/resourceManagement",
        iconType:"folder-open",
        children:[]
    },{
        name:"举报管理",
        route:"/reportManagement",
        iconType:"phone",
        children:[
            {
                name:"文章",
                route:"/article",
            },
            {
                name:"资源",
                route:"/resource",
            },
            {
                name:"评论",
                route:"/comments"    
            }
        ]
    },{
        name:"页面管理",
        route:"/pageManagement",
        iconType:"paper-clip",
        children:[]
    }
]
export default MeunData;
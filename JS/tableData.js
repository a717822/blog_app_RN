
const data = {
    "3": [
        {
            tableHead:["文章ID" , "标题" , "描述" , "类型" , "状态" , "发布时间" , "浏览次数" , "操作"],
            widthArr: [200, 200, 200, 200, 200, 200, 200, 200],
            url: 'list'
        }],
    "4": [
        {
            tableHead:["类别ID" , "文章类别名" , "操作"],
            widthArr: [200, 200, 200],
            url: 'getArticleCatelist'
        }],
    "14": [
        {
            tableHead:["资源ID" , "资源名" , "资源路径" , "下载次数" , "操作"],
            widthArr: [200, 200, 200 , 200, 200],
            url: 'getResourcesList'
        }],
    "17": [
        {
            tableHead:["留言ID" , "用户昵称" , "留言内容" , "添加时间" , "操作"],
            widthArr: [200, 200, 200 , 200, 200],
            url: 'getMessage'
        }],
    "18": [
        {
            tableHead: ["评论ID" , "用户昵称" , "留言内容" , "添加时间" , "操作"],
            widthArr: [200, 200, 200 , 200, 200],
            url: 'getDiscussList'
        }],
    "6": [
        {
            tableHead:["规则编号" , "权限名称" , "认证规则"  , "操作"],
            widthArr: [200, 200, 200 , 200],
            url: 'getAuthRulesList'
        }],
    "7": [
        {
            tableHead:["权限组ID" , "权限组名" , "状态" , "操作"],
            widthArr: [200, 200, 200 , 200],
            url: 'getAuthGroupsList'
        }],
    "8": [
        {
            tableHead:["权限类别ID" , "权限类别名" , "操作"],
            widthArr: [200, 200, 200],
            url: 'getAuthCateList'
        }],
    "9": [
        {
            tableHead:["管理员ID" , "昵称" , "用户名" , "权限组" , "状态" , "操作"],
            widthArr: [200, 200, 200 , 200, 200 , 200],
            url: 'getAdminList'
        }],
    "11" : [
        {
            tableHead:["菜单ID" , "菜单标题" , "链接" , "菜单分类" , "操作"],
            widthArr: [200, 200, 200 , 200, 200],
            url: 'getMenuList'
        }],
    "12" : [
        {
            tableHead:["菜单类别ID" , "菜单类别名" , "操作"],
            widthArr: [200, 200, 200],
            url: 'getMenuCateList'
        }]
};

let tableData = (id) => {
    return data[id];
};

export {
    tableData
}
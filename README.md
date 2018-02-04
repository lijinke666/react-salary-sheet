# send-wages-tool
发放工资条小工具
发工资条的时候 人事首先要做一个excel表格 里面有所有同事的工资
然后要一个一个的手动发到同事的邮箱,很麻烦 
开发这个小工具 解决人事 的烦恼

</br>

赶紧部署给你的人事姐姐用吧  : (#^.^#)

## 开发与部署
- `git clone https://github.com/lijinke666/send-wages-tool.git`
- 安装依赖 `npm install` or  `yarn`
- 本地开发 `npm start`
- 启动开发服务器 `npm run dev-server`
- 启动生产服务器 `npm run prod-server`  部署运行这个即可
- 打包 `npm run build`

---------------------

## 配置

> 修改 `/config/index.js`
```javascript
  const options = {
        ...
        emailService:"你的邮件服务器",            // qq || 163 ...
        adminEmail:"xxx@xx.com",                //发送邮件的那个人的邮箱
        AUHCODE:"xxxxxxxxxxxxx",                //授权码   如qq  需要在qq邮箱 > 设置 > 账户  里面去申请
        companyName:"xxxxxxxxxx",               //公司名字
        toolInfo:"xxxxxxxxxxxxxxx",             //工具名字
        
        ....
        配置excel表格字段 key无所谓  value要和excel字段一样  【工作邮箱必填】   比如:
        tableFields:{
          "id":"序号",
          "department":"部门",
          "name":"姓名",
          "duty":"职务",
          "baseWage":"基本工资",
          "daysLostFromWork":"缺勤天数",
          "absenceDeductions":"缺勤扣款",
          "beLate":"迟到",
          "bonus":"奖金",
          "wagesPayable":"应计工资",
          "insurance":"保险",
          "reservedFunds":"公积金",
          "subtotal":"小计",
          "OtherDeduction":"其他扣除",
          "salary":"应发工资",
          "taxWage":"计税工资",
          "ToBeCollectedTax":"代扣个税",
          "netPayroll":"实发工资",
          "remark":"备注",
          "email":"工作邮箱"
      }
  }
```

## 使用说明
> 1. config 里面配置好 相应的字段后 如上所述,对应的 `excel` 如下

![ttps://github.com/lijinke666/send-wages-tool/blob/master/document/excel.png](https://github.com/lijinke666/send-wages-tool/blob/master/document/excel.png)

> 2. 读取这个 `excel` 表格 确认无误后  点击发送

![ttps://github.com/lijinke666/send-wages-tool/blob/master/document/html.png](https://github.com/lijinke666/send-wages-tool/blob/master/document/html.png)

> 3. 工作邮箱对应的那个人 就会收到他自己的工资条

![ttps://github.com/lijinke666/send-wages-tool/blob/master/document/success.png](https://github.com/lijinke666/send-wages-tool/blob/master/document/success.png)


> exlce 名字 和工作邮箱 必填
 
| 序号        | 员工姓名          | 工作 邮箱 |
| ------------- |:-------------:| -----:|
| 1    | xxxxx | xxxx@xx.com |
| 2    | xxxx     |    xxxx@xx.com|
| 3 | xxxxx     |     xxxx@xx.com |


### Have Fun :)

 

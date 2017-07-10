# send-wages-tool
##### 发放工资条小工具
## 发工资条的时候 要一个一个的发到同事的邮箱,很麻烦  开发这个小工具 解决人事 的烦恼

- 首先安装 `npm i` or `yarn`
- 启动 `npm start`
- 启动开发服务器 `npm run dev-server`
- 启动生产服务器 `npm run prod-server`  如需部署到内网 之内的可以用这个 
- 打包 `npm run build`

---------------------

#### 配置
- 修改 `/config/index.js`
```javascript
  const options = {
        ...
        emailService:"你的邮件服务器",            // qq || 163 ...
        adminEmail:"xxx@xx.com",                //发送邮件的那个人的邮箱
        AUHCODE:"xxxxxxxxxxxxx",                //授权码   如qq  需要在qq邮箱》设置》账户  里面去申请
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

 ####你的excel 表格   名字 和工作邮箱 必填
 
| 序号        | 员工姓名          | 工作 邮箱 |
| ------------- |:-------------:| -----:|
| 1    | xxxxx | xxxx@xx.com |
| 2    | xxxx     |    xxxx@xx.com|
| 3 | xxxxx     |     xxxx@xx.com |

:)

#####  配置好了  `npm start` `npm run dev-server`  咻咻咻~查收邮件吧!
 

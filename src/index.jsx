import React, { Component } from "react";
import {
  Card ,
  Form,
  Button,
  Input,
  message
} from "antd";
class TableComponent extends Component {
  // _isMounted = false; // 这个变量是用来标志当前组件是否挂载
  state = {
    formData: {
			title: '',
			type: '',
			firstList: [
        { value: '' },
        { value: '' },
      ],
      lastList: [
        { value: '' }
      ]
		}
  };
  addTitleChange = (e) => {
    let value = e.target.value
    this.setState((state) => ({
      formData: {
				...state.formData,
				title: value
			}
    }))
  }
  addTypeChange = (e) => {
    let value = e.target.value
		this.setState((state) => ({
			formData: {
				...state.formData,
				type: value
			}
		}))
	}
  addListInputOne = (e, index, type) => {
    let value = e.target.value
    console.log(type)
    if(type === 'first') {
      const { firstList } = this.state.formData
      firstList[index].title = value
      this.setState((state) => ({
        formData: {
          ...state.formData,
          firstList: [...firstList]
        }
      }))
    }else {
      const { lastList } = this.state.formData
      lastList[index].title = value
      this.setState((state) => ({
        formData: {
          ...state.formData,
          lastList: [...lastList]
        }
      }))
    }
    
	}
  addButtonClick = (index, type) => {
    if(type === 'first') {
      this.setState((state) => ({
        formData: {
          ...state.formData,
          firstList: [...state.formData.firstList, {
            value: ''
          }]
        }
      }))
    }else {
      this.setState((state) => ({
        formData: {
          ...state.formData,
          lastList: [...state.formData.lastList, {
            value: ''
          }]
        }
      }))
    }
		
	}
  removeButtonClick = (item, index, type) => {
    if(!item.id) {
      this.updateList(index, type)
    }else {
      // 正常情况需要向后端发送请求删除的时候打开，不需要的时候只用if里面的就行了
      // http(xxxxx, item.id).then(res => {
        message.success('This is a success message');
        this.updateList(index, type)
      // })
    }
	}
  updateList(index, type) {
    if(type === 'first') {
      const { firstList } = this.state.formData
      firstList.splice(index, 1)
      this.setState((state) => ({
        formData: {
          ...state.formData,
          firstList: [...firstList]
        }
      }))
    }else {
      const { lastList } = this.state.formData
      lastList.splice(index, 1)
      this.setState((state) => ({
        formData: {
          ...state.formData,
          lastList: [...lastList]
        }
      }))
    }
  }
  submitButtonClick = () => {
    console.log('submit...')
    const { title, type, firstList, lastList } = this.state.formData;
    // 下面需要校验的
    if(!title) {
      return message.warning('请填写标题')
    }
    // 提交数据
  }
  render() {
    return (
      <div className='c-form-demo' style={{
        width: '1000px', minHeight: 200,borderWidth: '1px', borderStyle: 'solid',
        borderColor: '#ececec'
      }}>
        <div style={{ width: '100%', borderColor: '#fff' }}>
          <Form
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 19 }}
            name="form-demo"
            autoComplete="off"
            style={{ width: 300, background: '#fff', padding: 10, margin: 10 }}
          >
            <Form.Item
              label="标题:"
              name="标题"
              rules={[{ required: true, message: '请填写标题!' }]}
            >
              <Input onChange={ this.addTitleChange } />
            </Form.Item>
            <Form.Item label="类型:" name="类型">
              <Input onChange={ this.addTypeChange }/>	
            </Form.Item>	
          </Form>
        </div>
        <div style={{ 
          height: 200, overflowY: 'auto', width: 1000, boxSizing: 'border-box',display: 'flex', flexWrap: 'wrap',
          marginLeft: 10
        }}>
          <Card style={{ width: 480, minWidth: 400, height: 200, overflowY: 'auto', marginRight: 10 }}>
            {
              this.state.formData.firstList.map((item, index) => {
                return (
                  <div style={{ 'marginBottom': 10, display: 'flex'}} key={index + 'first'}>
                    <label style={{ width: 50, textAlign: 'right',paddingTop: 8, fontWeight: 700 }}>测试：</label> 
                    <Input
                      style={{ width: 200, marginRight: 10 }}
                      onChange={(e) => this.addListInputOne(e, index, 'first')}
                    />
                    {/* 一般情况都是最后一个添加，最后一个删除，前一个才能删除 */}
                    <Button
                      type="primary" style={{ marginRight: 10 }}
                      onClick={() => this.addButtonClick(index, 'first')}
                      disabled={ index !== this.state.formData.firstList.length - 1 }
                    >添加</Button>
                    {
                       (index > 0 && (index === this.state.formData.firstList.length - 1))
                      && <Button
                          type="primary"
                          danger="true"
                          onClick={() => this.removeButtonClick(item, index, 'first')}
                        >删除</Button>
                    }
                  </div>
                )
              })
            }
          </Card>
          <Card style={{ width: 480, minWidth: 400, height: 200, overflowY: 'auto'}}>
            {
              this.state.formData.lastList.map((item, index) => {
                return(
                  <div style={{ 'marginBottom': 10, display: 'flex'}}  key={index + 'last'}>
                    <label
                      style={{ width: 50, textAlign: 'right',paddingTop: 8, fontWeight: 700 }}
                    >测试：</label> 
                    <Input
                      style={{ width: 200, marginRight: 10 }}
                      onChange={(e) => this.addListInputOne(e, index, 'last')}
                    />
                    <Button
                      type="primary"  style={{ marginRight: 10 }}
                      onClick={ () => this.addButtonClick(index, 'last')}
                      disabled={ index !== this.state.formData.lastList.length - 1 }
                    >添加</Button>
                    {
                      (index > 0 && index === this.state.formData.lastList.length - 1)
                      && <Button
                          type="primary"
                          danger="true"
                          onClick={() => this.removeButtonClick(item, index, 'last')}
                        >删除</Button>
                    }
                  </div>
                )
              })
            }
          </Card>   
        </div>
        {/* center: 居中，left：居左， reght: 居右 */}
        <div style={{ wdith: '100%', textAlign: 'center', marginTop: 10 }}>
          <Button
            type="primary"
            onClick={ this.submitButtonClick }
          >提交</Button>
        </div>
      </div>
    )
  }
}

export default TableComponent;

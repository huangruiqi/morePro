import React, { Component } from 'react';
import { Card, Button, Select, Upload, message } from 'antd';
import * as qiniu from 'qiniu-js';
import './index.css';
import img from './temp.jpg';
import { connect } from 'react-redux';
import { getQiniuUpToken } from '../../api/pageManagementApi';
const Option = Select.Option;

class PageManage extends Component {
  handleUpload({ file, filename }) {
    getQiniuUpToken({ suffix: filename })
      .then((res) => {
        const { token, imgUrl } = res.data.data;
        qiniu.upload(file, imgUrl, token).subscribe({
          error(err) {
            message.error(err.toString());
          },
          complete(res) {
            console.log(res);
            message.success('上传成功！')
          }
        })
      }).catch((err) => {
        message.error(err.toString());
      });
  }
  render() {
    const { pageManagement: { homeBanner, sourceBanner } } = this.props;
    return (
      <div>
        <Card
          title='首页轮播管理'
          style={{ marginBottom: '20px' }}>
          <div className='pageManagementCardDiv'>
            <div className='pageManagementImgBox'>
              <img src={img} alt='' className='pageManagementImg' />
            </div>
            <div className='pageManagementActionBox'>
              <Select style={{ width: '100%' }} defaultValue={homeBanner[0]}>
                {homeBanner.map((item, index) => (<Option value={item} key={index}>{item}</Option>))}
              </Select>
              <Button>修改</Button>
              <Button>删除</Button>
              <Upload showUploadList={false}
                accept='image/*'
                customRequest={this.handleUpload.bind(this)}>
                <Button>添加</Button>
              </Upload>
            </div>
          </div>
        </Card>
        <Card
          title='资源轮播管理'
          style={{ marginBottom: '20px' }}>
          <div className='pageManagementCardDiv'>
            <div className='pageManagementImgBox'>
              <img src={img} alt='' className='pageManagementImg' />
            </div>
            <div className='pageManagementActionBox'>
              <Select style={{ width: '100%' }} defaultValue={sourceBanner[0]}>
                {sourceBanner.map((item, index) => (<Option value={item} key={index}>{item}</Option>))}
              </Select>
              <Button>修改</Button>
              <Button>删除</Button>
              <Upload showUploadList={false}
                accept='image/*'
                customRequest={this.handleUpload.bind(this)}>
                <Button>添加</Button>
              </Upload>
            </div>
          </div>
        </Card>
      </div>
    )
  }
}

export default connect(({ pageManagement }) => ({
  pageManagement
}))(PageManage);
import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme,Avatar,Dropdown} from 'antd';
import { Outlet,useNavigate,useLocation } from 'react-router-dom'
import './index.css';

const { Header, Content, Footer, Sider } = Layout;
// const items1 = ['1', '2', '3'].map(key => ({
//   key,
//   label: `nav ${key}`,
// }));
export const menuConfig = [
  {
    key: '/aircraft',
    icon: <UserOutlined />,
    label: 'Aircraft',
    children: [
      {
        key: '/aircraft/list',
        label: 'Aircraft List'
      },
      {
        key: '/aircraft/maintenance',
        label: 'Aircraft Maintenance'
      }
    ]
  },
  {
    key: '/dispatch',
    icon: <LaptopOutlined />,
    label: 'Dispatching',
    children: [
      {
        key: '/dispatch/schedule',
        label: 'Schedule List'
      },
      {
        key: '/dispatch/staff',
        label: 'Staff List'
      }
    ]
  }
]
const userMenu = {
  items: [
    { key: 'profile', label: 'Personal' },
    { key: 'logout', label: 'Logout' }
  ],
  onClick: ({ key }) => {
    if (key === 'logout') {
      console.log('logout')
    }
  }
}


const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Header className='Header'>
        <div className="demo-logo" >
          <h2 style={{ color: 'white' }}>Bi Aviation</h2>
        </div>
        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}
        >
          <Dropdown menu={userMenu} trigger={['click']}>
            <Avatar
              style={{ backgroundColor: '#87d068', cursor: 'pointer' }}
              icon={<UserOutlined />}
            />
          </Dropdown>
        </div>

      </Header>
      <div className="Layout-content">
        <Breadcrumb
          className='Breadcrumb'
          items={[{ title: 'Home' }, { title: 'aircraft' }, { title: 'List' }]}
        />
        <Layout className='Main-content'>
          <Sider className='Sider'>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
              items={menuConfig}
              selectedKeys={[location.pathname]}
              onClick={({key}) => {navigate(key)}}
            />
          </Sider>
          <Content className='Content'>
            <Outlet />
          </Content>
        </Layout>
      </div>
      <Footer className='Footer'>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};
export default MainLayout;
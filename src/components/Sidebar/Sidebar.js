import { Layout, Menu } from 'antd';
import React, { useContext } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import { AdminContext } from 'contexts/AdminContext';
const { SubMenu } = Menu;

const { Sider } = Layout;



const Sidebar = ({ logo, routes, toggleCollapse }) => {

    const { collapse, getWindowDimensions } = useContext(AdminContext);
    const handleClick = e => {
        console.log('click ', e);
    };

    let size = getWindowDimensions();
    const location = useLocation();
    let arr = location.pathname.split('/');
    var defaultOpenKey = ['/'];
    if (arr.length === 4) {
        defaultOpenKey = ['/' + arr[2]];
    }
    return (
        <Sider
            width={250}
            theme="light"
            collapsedWidth={size.width > 1000 ? 80 : 0}
            className="mysidebar"
            trigger={null} collapsible collapsed={collapse}>
            <Menu
                onClick={handleClick}
                defaultOpenKeys={defaultOpenKey}
                selectedKeys={['/' + arr[arr.length - 1]]}
                mode='inline'
            >
                {logo && (
                    <div className='mb-3' style={{ width: '100%', textAlign: 'center', }}>
                        {collapse ? (
                            <img
                                alt={logo.imgAlt}
                                className='mt-3'
                                style={{ width: '50px', height: '50px' }}
                                src={logo.imgSrc}
                            />
                        ) : (
                                <img
                                    alt={logo.imgAlt}
                                    style={{ width: '100px', height: '100px' }}
                                    src={logo.imgSrc}
                                />
                            )}
                        {!collapse && <h3 className='text-success'>{logo.logo_text}</h3>}
                    </div>
                ) }
                {routes.filter((item) => item.layout === '/admin'&&!item.contents).map((item, index) => {
                    return (
                        item.nodes ? (
                            <SubMenu icon={<i className={item.icon + ' mr-3 mt-1'} style={{ fontSize: 14 + 4 * collapse, fontWeight: 'bold' }} />} title={!collapse && item.name} key={item.path}>
                                {item.nodes.map((node, index) => {
                                    return (
                                        <Menu.Item key={node.path}>
                                            <NavLink
                                                to={node.layout + item.path + node.path}
                                                activeClassName="active"
                                            >
                                                {node.antIcon ? node.antIcon : <i className={node.icon + ' mr-3 mt-1'} style={{ fontSize: 14, fontWeight: 'bold' }} />} {node.name}
                                            </NavLink>
                                        </Menu.Item>
                                    )
                                })}

                            </SubMenu>
                        ) :
                            (<Menu.Item key={item.path} icon={item.antIcon ? item.antIcon : <i className={item.icon + ' mt-1 '} style={{ fontSize: 14 + 4 * collapse, fontWeight: 'bold', marginRight: 15 + 100 * collapse }} />}>
                                <NavLink to={item.layout + item.path}>
                                    {item.name}
                                </NavLink>
                            </Menu.Item>)
                    )
                })}
            </Menu>
        </Sider>
    );

}
export default Sidebar;
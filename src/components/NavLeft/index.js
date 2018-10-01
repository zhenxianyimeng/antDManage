import React from 'react'
import {Menu, Icon} from 'antd';
import './index.less'
import { NavLink} from 'react-router-dom'
import {connect} from 'react-redux';
import { switchMenu } from "../../redux/action/index";
//
// const MenuItemGroup = Menu.ItemGroup;
import MenuConfig from '../../config/menuConfig'
const SubMenu = Menu.SubMenu;

class NavLeft extends React.Component {

    state = {
        currentKey:''
    }

	handleClick = ({item, key})=> {
    	const { dispatch }  = this.props;
    	dispatch(switchMenu(item.props.title))
        this.setState({
            currentKey:key
        })
    }

    componentWillMount(){
        const menuTreeNode = this.renderMenu(MenuConfig);
        let currentKey = window.location.hash.replace('/#|\?.*$/g','')
        this.setState(
            {
                currentKey,
                menuTreeNode
            }
        )
    }

    //菜单渲染
    renderMenu = (data)=>{
        return data.map((item)=>{
            if(item.children){
                return(
                    <SubMenu title={item.title} key={item.key}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
                // return this.renderMenu(item.children)
            }
            return <Menu.Item title={item.title} key={item.key}>
	            <NavLink to={item.key}>
		            {item.title}
	            </NavLink>
	            </Menu.Item>
        })
    }

    render() {
        // const SubMenu = Menu.SubMenu;

        return (
            <div>
                <div className="logo">
                    <img src="/asserts/logo-ant.svg" alt=""/>
                    <h1>Imooc MS</h1>
                </div>
                <Menu theme="dark"
                      onClick={this.handleClick}
                    selectedKeys={[this.state.currentKey]}
                >

                    {/*<SubMenu key="sub1" title={<span><Icon type="mail"/><span>Navigation One</span></span>}>*/}
                        {/*<Menu.Item key="1">Option 1</Menu.Item>*/}
                        {/*<Menu.Item key="2">Option 2</Menu.Item>*/}
                        {/*<Menu.Item key="3">Option 3</Menu.Item>*/}
                        {/*<Menu.Item key="4">Option 4</Menu.Item>*/}
                    {/*</SubMenu>*/}
                    { this.state.menuTreeNode }
                </Menu>
            </div>
        );
    }

}

export default connect()(NavLeft);
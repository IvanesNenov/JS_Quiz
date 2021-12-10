import React, {Component} from 'react'
import classes from "./Drawer.module.css"
import BackDrop from "../BackDrop/BackDrop";
import {NavLink} from "react-router-dom";


const links = [
    {to: "/", label: 'Список', exact: true},
    {to: "/auth", label: 'Авторизация', exact: false},
    {to: "/quiz-creator", label: 'Создать Квиз', exact: false}
]

class Drawer extends Component {


    renderLinks() {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName={classes.active}
                        onClick={this.props.onClose}>
                        {link.label}
                    </NavLink>
                </li>
            )
        })
    }

    render() {
        const cls = [classes.Drawer]
        if (!this.props.isOpen) {
            cls.push(classes.close)
        }
        return (
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks()}
                    </ul>
                </nav>
                {this.props.isOpen ? <BackDrop onClick={this.props.onClose}/> : null}
            </React.Fragment>
        )
    }
}

export default Drawer
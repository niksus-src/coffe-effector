import styles from './layout.module.scss'

const Layout = (props: any) => {
    return (
    <div className={styles.layoutWrapper}>
        {props.children}
    </div>)
}

export default Layout;
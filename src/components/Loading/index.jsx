import { useEffect } from "react";
import Nprogress from 'nprogress'; // 这是一个进度条组件
import "nprogress/nprogress.css"; // progress bar style
import { Spin } from "antd";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const Loading = () => {
    useEffect(() =>{
        Nprogress.start();
        return () => {
            Nprogress.done()
        }
    })

    return (
        <div className="app-container">
            <Spin />
        </div>
    )
}

export default Loading
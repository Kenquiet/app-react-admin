import Loadable from "react-loadable";
import Loading from "@/components/Loading";

const Login = Loadable({ loader: () => import('@/pages/login'), loading: Loading })
const Home = Loadable({ loader: () => import('@/pages/home'), loading: Loading })

export default [
    { path: "/", component: Home, roles: [] },
]
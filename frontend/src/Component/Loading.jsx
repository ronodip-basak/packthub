import style from './loading.module.css'
export default function Loading() {
    return (
        <div className={style.ldsRing}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}
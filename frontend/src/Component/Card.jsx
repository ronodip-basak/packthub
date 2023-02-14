import style from './card.module.css';

export default function Card({ image, title, description }) {
    return (
        <div className={style.card}>
            <div className={style.imageContainer}>
                <img src={image} />
            </div>
            <div className={style.title}>
                {title}
            </div>
            <div className={style.description}>
                {description}
            </div>

        </div>
    )
}
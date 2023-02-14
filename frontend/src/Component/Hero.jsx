import heroImage from '../assets/Hero.jpg'
import style from './hero.module.css'

export default function Hero({
    url = null,
    aspectRatio = 3,
    backgroundSize = 'cover'
}) {
    return (
        <header style={{ paddingLeft: 0 }}>
            <div
                className='p-5 sm:p-2 text-center bg-image'
                style={{ backgroundImage: `url('${url ?? heroImage}')`, aspectRatio: aspectRatio, backgroundSize: backgroundSize }}
            >

                <div className='d-flex h-100' style={{flexDirection: 'column', justifyContent: 'end'}}>
                    <div className={style.btnContainer}>
                    <a className='btn btn-success' href='#!' role='button'>
                        Sign Up
                    </a>
                    </div>
                    
                </div>
            </div>
        </header>
    )
}
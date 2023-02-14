
import Hero from '../Component/Hero';
import FeaturedGenres from '../Component/FeaturedGenres';
import FeaturedBooks from '../Component/FeaturedBooks';
import { useRecoilState } from 'recoil';
import publicConfigAtom from '../atoms/publicConfigAtom';


export default function Index() {

    const [props, setProps] = useRecoilState(publicConfigAtom)

    

    return (
        <>
            <Hero />
            {props &&
                <>
                    <FeaturedGenres genres={props.featured_genres} />
                    <FeaturedBooks books={props.featured_books} />
                </>
            }



        </>
    );
}
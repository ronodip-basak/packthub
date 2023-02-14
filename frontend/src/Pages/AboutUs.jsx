import Card from "../Component/Card";
import drmFree from '../assets/drm-free.svg'
import booksPublished from '../assets/books-published.svg'
import support from '../assets/support.svg'
import worldWide from '../assets/worldWide.svg'



export default function AboutUs() {

    const cards = [
        {
            image: drmFree,
            title: 'DRM Free!',
            description: "Packt’s eBooks and videos are free from DRM"
        },

        {
            image: booksPublished,
            title: 'Books Published',
            description: "Packt has published over 6,500 books and videos"
        },

        {
            image: support,
            title: 'Support',
            description: "Packt has donated over $1,000,000 to Open Source projects"
        },

        {
            image: worldWide,
            title: 'World Wide',
            description: "Packt is a global company based in Birmingham, UK"
        },
    ]

    return (
        <>
            <div className="container p-4 mt-4">
                <h1>About Us</h1>

                <p>Founded in 2004 in Birmingham, UK, Packt’s mission is to help the world put software to work in new ways, through the delivery of effective learning and information services to IT professionals. Working towards that vision, we have published over 6,500 books and videos so far, providing IT professionals with the actionable knowledge they need to get the job done – whether that’s specific learning on an emerging technology or optimizing key skills in more established tools. As part of our mission, we have also awarded over $1,000,000 through our Open Source Project Royalty scheme, helping numerous projects become household names along the way.</p>
                <div className="mt-4">
                    <h1 className="text-center">PACKT FACTS</h1>
                    <div className="p-4 row">
                        {cards.map(card => {
                            return (
                                <div className="col-lg-3 col-md-4">
                                    <Card
                                        image={card.image}
                                        title={card.title}
                                        description={card.description}
                                    />
                                </div>
                            )
                        })}
                        
                    </div>
                </div>
            </div>
        </>
    )
}
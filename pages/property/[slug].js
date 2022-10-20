// import Image from "next/image"
import Link from "next/link"
import { sanityClient } from "../../sanity"
import { isMultiple } from '../../utils'
import Image from "../../components/Image"
import Review from "../../components/Review"
import Mapita from '../../components/Mapita'
import Map from "../../components/Map"

const Property = ({
    title,
    location,
    propertyType,
    mainImage,
    images,
    pricePerNight,
    beds,
    bedrooms,
    description,
    host,
    reviews
}) =>{
    const reviewAmount = reviews.length
    
    return(
        <div className="container">
            <h1><b>{title}</b></h1>
            <p>{reviewAmount} review{isMultiple(reviewAmount)}</p>

            <div className="images-section">
                <Image identifier='main-image' image={mainImage} alt='imagen de proyecto'/>
                <div className="sub-images-section">
                    {/* {images.map((_key, image) => <Image key={_key} identifier='image' image={image} alt='imagen de proyecto'/>)} */}
                    {images.map(({ _key, asset }, image) => (
                    <Image key={_key} identifier="image" image={asset} alt='imagen' />
                    ))}
                </div>
            </div>

            <div className="section">
                <div className="information">
                <h2>{propertyType} hosted by <b>{host.name}</b> </h2>
                <h4>{bedrooms} bedroom{isMultiple(bedrooms)} * {beds} bed{isMultiple(beds)}</h4>
                <hr/>
                <h4><b>Enhanced Clean</b></h4>
                <p>This host is commited to MicasaTucasa 5-step enhanced cleaning process</p>
                <h4><b>Amenities for everyday living</b></h4>
                <p>The host has equipped this place for long stays</p>
                <h4><b>House rules</b></h4>
                <p>This place isn&#39;t suitable for pets</p>
                
                    <div className="price-box">
                        <h2>${pricePerNight} Dls</h2>
                        <h4>{reviewAmount} review{isMultiple(reviewAmount)} </h4>
                        <Link href='/'>
                            <div className="button" onClick={() => {}}>Change Dates</div>
                        </Link>
                    </div>
                </div>
            </div>

            <hr/>
            <h4>{description}</h4>

            <hr/>
            <h2>{reviewAmount} review{isMultiple(reviewAmount)}</h2>
            {reviewAmount > 0 && 
                reviews.map((review) => <Review key={review.key} review={review}/>)
            }
            <hr/>
            <h2>Location</h2>
            {/* <Mapita/> */}
            <Map location={location}></Map>
            
        </div>
    )
}

export const getServerSideProps = async (pageContext) => {
const pageSlug = pageContext.query.slug

const query = `*[ _type == "property" && slug.current == $pageSlug][0]{
    title,
    location,
    propertyType,
    mainImage,
    images,
    pricePerNight,
    beds,
    bedrooms,
    description,
    host->{
    _id,
    name,
    slug,
    image
    },
    reviews[]{
    ...,
    traveller->{
        _id,
        name,
        slug,
        image
    }
    }
}`

const property = await sanityClient.fetch(query, { pageSlug })

if (!property) {
    return {
    props: null,
    notFound: true,
    }
} else {
    return {
    props: {
        title: property.title,
        location: property.location,
        propertyType: property.propertyType,
        mainImage: property.mainImage,
        images: property.images,
        pricePerNight: property.pricePerNight,
        beds: property.beds,
        bedrooms: property.bedrooms,
        description: property.description,
        host: property.host,
        reviews: property.reviews,
    },
    }
}
}


export default Property
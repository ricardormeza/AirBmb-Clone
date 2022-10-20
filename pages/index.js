import Link from 'next/link'
import DashboardMap from '../components/DashboardMap'
// import { SanityClient } from "next-sanity"
import { sanityClient, urlFor } from '../sanity'
import { isMultiple } from '../utils'


const Home = ({properties}) => {
  console.log(properties)
  return (
    <>
    {properties && (
      <div className='main'>
        <div className='feed-container'>
          <h1>Places to stay near you</h1>
          <div className='feed'>
            {properties.map((property) => (
            <div key={property._id} className='card'>
              <Link href={`property/${property.slug.current}`}>
                <a>
                  <img src={urlFor(property.mainImage)}/>
                  <p>{property.reviews.length} reviews{isMultiple(property.reviews.length)}</p>
                  <h3>{property.title}</h3>
                  <h3><strong>{property.pricePerNight} Per Night</strong></h3>
                </a>
              </Link>
            </div>
            ))}
          </div>
        </div>
          <div className='map'>
            <DashboardMap properties={properties}/>
          </div>
      </div>
    )}
    </>
  )
}

export const getServerSideProps = async () => {
  const query = '*[ _type == "property"]'
  const properties = await sanityClient.fetch(query)

  if(!properties.length){
    return{
      props:{
        properties: [],
      },
    }
  }else{
    return{
      props:{
        properties
      }
    }
  }
}

export default Home
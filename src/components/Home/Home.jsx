
import AboutUs from './AboutUs'
import Banner from './Banner'
import ContactUs from './ContactUs'
import FeatureClothes from './FeatureClothes'
import FeatureFoods from './FeatureFoods'
import FeatureGrocery from './FeatureGrocery'



function Home() {

  

  return (
    <div className='max-w-4xl mx-auto'>
      <Banner />
      <FeatureFoods />
      <FeatureClothes/>
      <FeatureGrocery/>
      <AboutUs />
      <ContactUs />
    </div>

  )
}

export default Home




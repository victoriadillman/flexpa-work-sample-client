import { useEffect, useState } from "react"
import BenefitDisplay from "./benefitDisplay";

interface BenefitProps {
  accessInfo: {
    accessToken?: string,
    expiresIn?: number,
  }
}

export default function BenefitsContainer({accessInfo} : BenefitProps) {
  const { accessToken, expiresIn } = accessInfo;
  const [ benefit, setBenefit ] = useState<any>(null)
  const [isLoading, setLoading ] = useState<boolean>(true)
  
  useEffect(() => {
    if (!accessToken) return;

    // Making the call to server for the Benefits using Flexpa API with access token received through the Link exchange for commponents to use
    const fetchData = async () => {
      let response;
      try {
        response = await fetch('http://localhost:8000/benefit-route', {
          headers: {
            "Content-type": "application/json",
            Authorization : `Bearer ${accessToken}`,
          }
        })
        const returnedBenefit = await response.json();
        setBenefit(returnedBenefit);
        setLoading(false)
      } catch(err) {
        console.log(`error on request to server ${err}`)
      }
    }
    fetchData();
  }, [accessToken, expiresIn])

  return(
    <div>
      {isLoading? (<p>Loading...</p>) : (<BenefitDisplay benefit={benefit} />)}
    </div>
  )
}
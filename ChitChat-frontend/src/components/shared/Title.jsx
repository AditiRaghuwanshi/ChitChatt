import { Helmet } from "react-helmet-async"


const Title = (
    {
        title = "chitchat",
        description = "this is a chit chat application called chatarpatar",
    }
) => {
  return ( 
  
  <Helmet>
  <title>{title}</title>
  <meta namee ="description" content={description} />
  </Helmet>

  );

};

export default Title

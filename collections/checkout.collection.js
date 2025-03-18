import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51R40aT02adbUCBungw2B10wSrRPas3GWGpQMpiy3tudyjZbaSNKbfbA9MYlnywQVE00andXJOtap5is57NSYxljB00eZxWc455')

export const createCheckout=async(req,res)=>{
    try {
        const { checkoutData } = req.body; 
        const { items, totalPrice } = checkoutData;
      
        const lineItems   =items.map((item)=>({
            price_data:{
                currency : "usd",
                product_data : {
                    name : item.title,
                    images : [item.image]
                },
                unit_amount: Math.round(item.price*100)
            },
            quantity : item.quantity
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types : ["card"],
            line_items : lineItems,
            mode : "payment",
            success_url : "https://beamish-halva-076a02.netlify.app/success",
            cancel_url : "https://beamish-halva-076a02.netlify.app/failed"
        })
        res.json({id : session.id})
    } catch (error) {
        res.status(500).json({message : "Internal Server Error"})
    }
}
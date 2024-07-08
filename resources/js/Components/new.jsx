import { Link } from "@inertiajs/react";

export default function Pagination(links, queryParams){
    return(
        <nav className="text-center mt-2">
            {links.map((link)=>{                
                let url = link.url;
                    if (url) {
                        const params = new URLSearchParams();
                        if ( queryParams.name) params.append(queryParams.name);
                        if (queryParams.status) params.append(queryParams.status);
                        url = `${url}&${params.toString}`
                    }            
                }
                return (
                    <Link>
                    </Link>
                )  
            
                )    
            }
        </nav>
    )
}
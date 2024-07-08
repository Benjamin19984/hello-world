import { Link } from "@inertiajs/react";

export default function Pagination({ links, queryParams }) {
    return (
        <nav className="text-center mt-2">
            {links.map((link) => {
                let url = link.url;
                if (url) {
                    // Append query parameters if they exist
                    const params = new URLSearchParams();
                    if (queryParams.status) params.append('status', queryParams.status);
                    if (queryParams.name) params.append('name', queryParams.name);

                    url = `${url}&${params.toString()}`;
                }

                return (
                    <Link 
                        href={url || ""}
                        key={link.label}
                        className={
                            "inline-block py-2 px-3 text-xs rounded-lg text-gray-200" +
                            (link.active ? " bg-gray-950" : "") +
                            (!link.url ? " !text-gray-500 cursor-not-allowed" : " hover:bg-gray-950")
                        }
                        dangerouslySetInnerHTML={{ __html: link.label }}>
                    </Link>
                );
            })}
        </nav>
    );
}

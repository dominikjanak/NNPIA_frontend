import React from 'react';
import image from "./confounded-face.png"

class PageNotFoundComponent extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row mt-5">
                    <div className="col-12 col-md-6 offset-md-3 text-center">
                        <h1>404 - Page Not Found</h1>
                        <h4 className="mt-4">Požadovaná stránka nebyla nalezena</h4>
                        <img src={image} className="mt-3" alt="Page not found" width="150"/>
                        <p className="mt-3">Litujeme, ale požadovaná stránka na adrese nebyla nalezena. Stránka mohla být odstraněna nebo přemístěna, případně byl nesprávně zadán odkaz.
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default PageNotFoundComponent;
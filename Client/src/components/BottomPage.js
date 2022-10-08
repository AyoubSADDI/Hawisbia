import React, { Component } from 'react'
import { Media } from 'reactstrap'
import "./css/bootstrap.min.css"
import { withTranslation } from "react-i18next";

 class BottomPage extends Component {

    render() {
        const { t } = this.props;

        return (
            <div className="container">
                 <div class="row">
            <div class="col-md-5 offset-md-5">
                <div class="row">
                    <div class="col">
                    <Media className="myimgs" object src="/icons8events.png" alt="Generic placeholder image" />
                    <div style={{marginTop:"1rem"}}>
                        <a href="/m/games">
                        {t('Games')}

                        </a>
                    </div>
                    </div>
                    <div class="col">
                    <Media className="myimgs" object src="/icons8events.png" alt="Generic placeholder image" />
                    <div style={{marginTop:"1rem"}}>
                        <a href="/m/maison">
                        {t('Guest House')}
                            </a>
                    </div>
                    </div>
                    <div class="col">
                    <Media className="myimgs" object src="/icons8events.png" alt="Generic placeholder image" />
                    <div style={{marginTop:"2rem"}}>
                        <a href="/m/castronomy">
                        {t('Gastronomy')}

                            </a>
                    </div>
                    </div>
                    <div class="col">
                    <Media className="myimgs" object src="/icons8events.png" alt="Generic placeholder image" />
                    <div style={{marginTop:"1rem"}}>
                        <a href="/m/products">
                        {t('Products')}

                            </a>
                    </div>
                    </div>

                    
                </div>
            </div>
          </div>

            </div>
           
        )
    }
}
export default withTranslation()(BottomPage)
import ReactFullpage from '@fullpage/react-fullpage';

import { SectionHomeFirst } from "./SectionHome";
import { SectionHomeSecond } from "./SectionHome";
import { SectionHomeThird } from "./SectionHome";
import { SectionHomeFourth } from "./SectionHome";
const pluginWrapper = () => {
    /*
    * require('../static/fullpage.scrollHorizontally.min.js'); // Optional. Required when using the "scrollHorizontally" extension.
    */
};
export default function HomeTemplate() {
    const anchors = ["", "about", "team", "contact_us"];
    return (
        <ReactFullpage
            anchors={anchors}
            navigation
            pluginWrapper={pluginWrapper}
            render={({ state, fullpageApi }) => (
                <ReactFullpage.Wrapper>
                    <div className="section">
                        <SectionHomeFirst />
                    </div>
                    <div className="section">
                        <SectionHomeSecond />
                    </div>
                    <div className="section">
                        <SectionHomeThird />
                    </div>
                    <div className="section">
                        <SectionHomeFourth />
                    </div>
                </ReactFullpage.Wrapper>
            )
            }
        />
    );
}

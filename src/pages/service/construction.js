import HeroSectionStyleTwo from '@/components/hero/styleTwo'
import { LayoutOne } from '@/layouts'
import serviceData from '@/data/service/construction.json'
import BuildingPackageTable from '@/components/table/BuildingPackageTable'

const Construction = () => {
    return (
        <LayoutOne topbar={true}>
            <div className="ltn__slider-area ltn__slider-11 section-bg-1">
                <HeroSectionStyleTwo data={serviceData.hero} />
            </div>

            <div className="ltn__about-us-area pt-115 pb-100">
                <BuildingPackageTable />
            </div>

        </LayoutOne>
    )
}

export default Construction
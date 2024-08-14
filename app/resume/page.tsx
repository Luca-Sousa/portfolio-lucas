import NavigationMenuItems from "../_components/navigation-menu"
import SideBar from "../_components/side-bar"
import { Card, CardHeader, CardTitle } from "../_components/ui/card"

const Resume = () => {
  return (
    <div>
      <SideBar />
      <NavigationMenuItems />

      <Card className="m-4 rounded-3xl">
        <CardHeader className="space-y-3">
          <div className="space-y-1">
            <CardTitle>Resumo</CardTitle>
            <div className="h-1 w-8 rounded-3xl bg-primary"></div>
          </div>
        </CardHeader>
      </Card>
    </div>
  )
}

export default Resume

import {Card,CardContent,Typography} from '@material-ui/core'

function InfoBox({title,cases,total}){
    return(
        <div>
            <Card>
                <CardContent>

                    {/*Title i.e corona virus cases */}
                    <Typography className="infoBox_title" color="textSecondary">{title}</Typography>

                    {/*cases*/}
                    <h2 className="infoBox_cases">{cases}</h2>

                    {/*total */}
                    <Typography className="infoBox_total" color="textSecondary">{total} Total</Typography>

                </CardContent>
            </Card>
        </div>
    )
}

export default InfoBox;
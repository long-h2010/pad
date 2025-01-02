import { Container, Typography, Grid } from '@mui/material';
import AppConversionRates from '../../components/admin-dashboard/app-conversion-rates';
import AppCurrentVisits from '../../components/admin-dashboard/app-current-visits';
import AppTasks from '../../components/admin-dashboard/app-tasks';
import AppTrafficBySite from '../../components/admin-dashboard/app-traffic-by-site';
import AppWebsiteVisits from '../../components/admin-dashboard/app-website-visits';
import AppWidgetSummary from '../../components/admin-dashboard/app-widget-summary';
import Iconify from '../../components/admin/iconify/iconify';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useGlobalContext } from '../../context';
import UserIcon from '/icons/user-icon.png';
import DocumentIcon from '/icons/document-icon.png';
import BugIcon from '/icons/bug-icon.png'

// ----------------------------------------------------------------------

export default function Dashboard() {
    const { user_url, doc_url } = useGlobalContext();
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalDocuments, setTotalDocuments] = useState(0);

    useEffect(() => {
        axios
            .get(`${user_url}/total-users`)
            .then((res) => {
                console.log(res);
                setTotalUsers(res.data);
            })
            .catch((err) => console.log(err));
            
        axios
        .get(`${doc_url}/total-documents`)
        .then((res) => {
            console.log(res);
            setTotalDocuments(res.data);
        })
        .catch((err) => console.log(err));
    })
    return (
        <Container>
            <Typography variant='h4' sx={{ mb: 5 }}>
                Hi, Welcome back 👋
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <AppWidgetSummary
                        title='Total Users'
                        total={totalUsers}
                        color='info'
                        icon={<img alt='icon' src={UserIcon} />}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <AppWidgetSummary
                        title='Total Documents'
                        total={totalDocuments}
                        color='warning'
                        icon={<img alt='icon' src={DocumentIcon} />}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <AppWidgetSummary
                        title='Bug Reports'
                        total={234}
                        color='error'
                        icon={<img alt='icon' src={BugIcon} />}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={8}>
                    <AppWebsiteVisits
                        title='Website Visits'
                        subheader='(+43%) than last year'
                        chart={{
                            labels: [
                                '01/01/2003',
                                '02/01/2003',
                                '03/01/2003',
                                '04/01/2003',
                                '05/01/2003',
                                '06/01/2003',
                                '07/01/2003',
                                '08/01/2003',
                                '09/01/2003',
                                '10/01/2003',
                                '11/01/2003',
                            ],
                            series: [
                                {
                                    type: 'area',
                                    fill: 'gradient',
                                    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                                }
                            ],
                        }}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <AppCurrentVisits
                        title='Current Visits'
                        chart={{
                            series: [
                                { label: 'America', value: 4344 },
                                { label: 'Asia', value: 5435 },
                                { label: 'Europe', value: 1443 },
                                { label: 'Africa', value: 4443 },
                            ],
                        }}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={8}>
                    <AppConversionRates
                        title='Conversion Rates'
                        subheader='(+43%) than last year'
                        chart={{
                            series: [
                                { label: 'Italy', value: 400 },
                                { label: 'Japan', value: 430 },
                                { label: 'China', value: 448 },
                                { label: 'Canada', value: 470 },
                                { label: 'France', value: 540 },
                                { label: 'Germany', value: 580 },
                                { label: 'South Korea', value: 690 },
                                { label: 'Netherlands', value: 1100 },
                                { label: 'United States', value: 1200 },
                                { label: 'United Kingdom', value: 1380 },
                            ],
                        }}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <AppTrafficBySite
                        title='Traffic by Site'
                        list={[
                            {
                                name: 'FaceBook',
                                value: 323234,
                                icon: (
                                    <Iconify icon='eva:facebook-fill' color='#1877F2' width={32} />
                                ),
                            },
                            {
                                name: 'Google',
                                value: 341212,
                                icon: <Iconify icon='eva:google-fill' color='#DF3E30' width={32} />,
                            },
                            {
                                name: 'Linkedin',
                                value: 411213,
                                icon: (
                                    <Iconify icon='eva:linkedin-fill' color='#006097' width={32} />
                                ),
                            },
                            {
                                name: 'Twitter',
                                value: 443232,
                                icon: (
                                    <Iconify icon='eva:twitter-fill' color='#1C9CEA' width={32} />
                                ),
                            },
                        ]}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={8}>
                    <AppTasks
                        title='Tasks'
                        list={[
                            { id: '1', name: 'Create FireStone Logo' },
                            { id: '2', name: 'Add SCSS and JS files if required' },
                            { id: '3', name: 'Stakeholder Meeting' },
                            { id: '4', name: 'Scoping & Estimations' },
                            { id: '5', name: 'Sprint Showcase' },
                        ]}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}

import { i18n } from '@lingui/core';
import { t } from '@lingui/macro';
import { I18nProvider } from '@lingui/react';
import { Coding } from 'fhir/r4b';
import React, { useEffect } from 'react';
// eslint-disable-next-line import/order
import { createRoot } from 'react-dom/client';

import '@beda.software/emr/dist/services/initialize';
import 'antd/dist/reset.css';
import '@beda.software/emr/dist/style.css';

// You can copy dashboard into your project workspace and adjust appearance and widgets.
// Use https://github.com/beda-software/fhir-emr/blob/master/src/dashboard.config.ts as example;

// You can specify your own theme to ajdust color,
// Use you https://github.com/beda-software/fhir-emr/blob/master/src/theme/ThemeProvider.tsx as example
import { Route } from 'react-router-dom';

import { App } from '@beda.software/emr/containers';
import { ValueSetExpandProvider } from '@beda.software/emr/contexts';
import { MenuLayout } from '@beda.software/emr/dist/components/BaseLayout/Sidebar/SidebarTop/context';
import { PatientDashboardProvider } from '@beda.software/emr/dist/components/Dashboard/contexts';
import { dashboard } from '@beda.software/emr/dist/dashboard.config';
import {
    InvoicesIcon,
    ServicesIcon,
    EncountersIcon,
    PatientsIcon,
    PractitionersIcon,
    MedicationsIcon,
    OrganizationsIcon,
} from '@beda.software/emr/icons';
import { expandHealthSamuraiValueSet } from '@beda.software/emr/services';
import { ThemeProvider } from '@beda.software/emr/theme';
import { matchCurrentUserRole, Role } from '@beda.software/emr/utils';
import { isSuccess } from '@beda.software/remote-data';

import { EncountersUberList } from './containers/EncountersUberList';
import { ImmunizationsUberList } from './containers/ImmunizationsUberList ';
import { MedicationsUberList } from './containers/MedicationsUberList';
import { ObservationsUberList } from './containers/ObservationsUberList';
import { OrganizationsUberList } from './containers/OrganizationsUberList';
import { PatientUberList } from './containers/PatientsUberList';
import { PractitionersUberList } from './containers/PractitionersUberList ';
import { ProceduresUberList } from './containers/ProceduresUberList';
import { dynamicActivate, getCurrentLocale } from './services/i18n';
import { PatientDetails } from './containers/PatientsUberList/detail';

async function expandEMRValueSet(answerValueSet: string | undefined, searchText: string): Promise<Coding[]> {
    if (!answerValueSet) {
        return [];
    }

    const res = await expandHealthSamuraiValueSet(answerValueSet, searchText);

    if (isSuccess(res)) {
        return res.data;
    }

    return [];
}

export const AppWithContext = () => {
    useEffect(() => {
        dynamicActivate(getCurrentLocale());
    }, []);

    return (
        <I18nProvider i18n={i18n}>
            <ValueSetExpandProvider.Provider value={expandEMRValueSet}>
                <PatientDashboardProvider dashboard={dashboard}>
                    <ThemeProvider>
                        <MenuLayout.Provider
                            value={() =>
                                matchCurrentUserRole({
                                    [Role.Admin]: () => [
                                        { label: t`Patients`, path: '/patients-ph', icon: <PatientsIcon /> },
                                        { label: t`Encounters`, path: '/encounters-ph', icon: <EncountersIcon /> },
                                        {
                                            label: t`Practitioners`,
                                            path: '/practitioners-ph',
                                            icon: <PractitionersIcon />,
                                        },
                                        {
                                            label: t`Organizations`,
                                            path: '/organizations-ph',
                                            icon: <OrganizationsIcon />,
                                        },
                                        { label: t`Immunizations`, path: '/immunizations-ph', icon: <InvoicesIcon /> },
                                        { label: t`Observations`, path: '/observations-ph', icon: <ServicesIcon /> },
                                        { label: t`Medications`, path: '/medications-ph', icon: <MedicationsIcon /> },
                                        { label: t`Procedures`, path: '/procedures-ph', icon: <ServicesIcon /> },
                                    ],
                                    [Role.Practitioner]: () => [],
                                    [Role.Patient]: () => [],
                                    [Role.Receptionist]: () => [],
                                })
                            }
                        >
                            <App
                                authenticatedRoutes={
                                    <>
                                        <Route path="/patients-ph" element={<PatientUberList />} />
                                        <Route path="/patients-ph/:id" element={<PatientDetails />} />
                                        <Route path="/encounters-ph" element={<EncountersUberList />} />
                                        <Route path="/practitioners-ph" element={<PractitionersUberList />} />
                                        <Route path="/organizations-ph" element={<OrganizationsUberList />} />
                                        <Route path="/procedures-ph" element={<ProceduresUberList />} />
                                        <Route path="/immunizations-ph" element={<ImmunizationsUberList />} />
                                        <Route path="/observations-ph" element={<ObservationsUberList />} />
                                        <Route path="/medications-ph" element={<MedicationsUberList />} />
                                    </>
                                }
                            />
                        </MenuLayout.Provider>
                    </ThemeProvider>
                </PatientDashboardProvider>
            </ValueSetExpandProvider.Provider>
        </I18nProvider>
    );
};

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AppWithContext />
    </React.StrictMode>,
);

import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { Coding } from 'fhir/r4b';
import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import '@beda.software/emr/dist/services/initialize';
import 'antd/dist/reset.css';
import '@beda.software/emr/dist/style.css';

// You can copy dashboard into your project workspace and adjust appearance and widgets.
// Use https://github.com/beda-software/fhir-emr/blob/master/src/dashboard.config.ts as example;

// You can specify your own theme to ajdust color,
// Use you https://github.com/beda-software/fhir-emr/blob/master/src/theme/ThemeProvider.tsx as example

import { ValueSetExpandProvider } from '@beda.software/emr/contexts';
import { PatientDashboardProvider } from '@beda.software/emr/dist/components/Dashboard/contexts';
import { dashboard } from '@beda.software/emr/dist/dashboard.config';
import { expandHealthSamuraiValueSet } from '@beda.software/emr/services';
import { ThemeProvider } from '@beda.software/emr/theme';
import { isSuccess } from '@beda.software/remote-data';

import { App } from 'src/containers/App';

import { dynamicActivate, getCurrentLocale } from './services/i18n';

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
                        <App />
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

import { mapSuccess } from 'aidbox-react';
import { PractitionerRole } from 'fhir/r4b';

import { formatFHIRDate } from 'aidbox-react/lib/utils/date';

import { extractBundleResources, SearchParams } from '@beda.software/fhir-react';

import { getFHIRResources } from 'src/services';

export function getPatientSearchParamsForPractitioner(practitionerId: string): SearchParams {
    return {
        status: 'active',
        category: 'data-sharing',
        period: formatFHIRDate(new Date()),
        actor: practitionerId,
        _include: ['Consent:patient:Patient'],
    };
}
export function getPractitionerRole(practitionerId: string) {
    const practitionerRoleRD = async () => {
        const response = await getFHIRResources<PractitionerRole>('PractitionerRole', {
            practitioner: `Practitioner/${practitionerId}`,
        });
        return mapSuccess(response, (bundle) => {
            return extractBundleResources(bundle).PractitionerRole;
        });
    };
    return practitionerRoleRD;
}

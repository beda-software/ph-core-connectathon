import type { Dashboard, DashboardInstance } from '@beda.software/emr/dist/components/Dashboard/types';
import { OverviewCard } from '@beda.software/emr/dist/containers/PatientDetails/PatientOverviewDynamic/components/StandardCard/types';
import { StandardCardContainerFabric } from '@beda.software/emr/dist/containers/PatientDetails/PatientOverviewDynamic/containers/StandardCardContainerFabric/index';
import { Bundle, Encounter, Immunization, Observation, Patient, Procedure } from 'fhir/r4b';
import { getOrganization, getPractitioner } from '../EncountersUberList';
import { formatHumanDateTime, formatPeriodDateTime } from '@beda.software/emr/utils';
import { getPerformers } from '../ImmunizationsUberList ';
import { getObservationCode, getObservationValue } from '../ObservationsUberList';

function prepareEncounter(
    resources: Encounter[],
    bundle: Bundle<Encounter>,
): OverviewCard<Encounter> {

    return {
        title: 'Encounters',
        key: 'ecnounter',
        icon: <h2></h2>,
        data: resources,
        total: bundle.total ?? 0,
        getKey: (r) => r.id!,
        columns: [
            {
                title: 'Status',
                key: 'status',
                render: (resource) => {
                    return resource.status;
                },
            },
            {
                title: 'Date',
                key: 'date',
                width: 250,
                render: (resource) => formatPeriodDateTime(resource.period),
            },
            {
                title: 'Practitioner',
                key: 'practitioner',
                render: (resource) => {
                    const reference = getPractitioner(resource);
                    if (reference) {
                        return reference.display ?? reference.reference;

                    }
                },
            },
            {
                title: 'Organization',
                key: 'organization',
                render: (resource) => {
                    const reference = getOrganization(resource);
                    if (reference) {
                        return reference.display ?? reference.reference;

                    }
                },
            },
       ]
        ,
    };
}


function prepareImmunization(
    resources: Immunization[],
    bundle: Bundle<Immunization>,
): OverviewCard<Immunization> {

    return {
        title: 'Immunization',
        key: 'immunization',
        icon: <h2></h2>,
        data: resources,
        total: bundle.total ?? 0,
        getKey: (r) => r.id!,
        columns: [
            {
                title: 'Status',
                key: 'status',
                render: (resource) => {
                    return resource.status;
                },
            },
            {
                title: 'Date',
                key: 'date',
                width: 250,
                render: (resource) => formatHumanDateTime(resource.occurrenceDateTime),
            },
            {
                title: 'Vaccine',
                key: 'vaccine',
                width: 250,
                render: (resource) => resource.vaccineCode.text,
            },
            {
                title: 'Performer',
                key: 'performer',
                render: (resource) => {
                    const references = getPerformers(resource);
                    return references.map(reference =>
                        reference.display ?? reference.reference
                    );
                },
            },

        ]
    };
}

function prepareObservation(
    resources: Observation[],
    bundle: Bundle<Observation>,
): OverviewCard<Observation> {

    return {
        title: 'Observation',
        key: 'observation',
        icon: <h2></h2>,
        data: resources,
        total: bundle.total ?? 0,
        getKey: (r) => r.id!,
        columns: [
            {
                title: 'Status',
                key: 'status',
                render: (resource) => {
                    return resource.status;
                },
            },
            {
                title: 'Date',
                key: 'date',
                render: (resource) => formatHumanDateTime(resource.effectiveDateTime),
            },
            {
                title: 'Code',
                key: 'code',
                render: (resource) => getObservationCode(resource),
            },
            {
                title: 'Value',
                key: 'value',
                render: (resource) => getObservationValue(resource),
            }
        ],
    };
}

function prepareProcedure(
    resources: Procedure[],
    bundle: Bundle<Procedure>,
): OverviewCard<Procedure> {

    return {
        title: 'Procedure',
        key: 'procedure',
        icon: <h2></h2>,
        data: resources,
        total: bundle.total ?? 0,
        getKey: (r) => r.id!,
        columns: [
            {
                title: 'Status',
                key: 'status',
                render: (resource) => {
                    return resource.status;
                },
            },
            {
                title: 'Code',
                key: 'code',
                render: (resource) => {
                    return resource.code?.text ?? resource.code?.coding?.[0]?.display;
                },
            },
        ]
    };
}

const patientDashboardConfig: DashboardInstance = {
    top: [
        {
            query: {
                resourceType: 'Encounter',
                search: (patient: Patient) => ({
                    patient: patient.id,
                    _count: 7,
                }),
            },
            widget: StandardCardContainerFabric(prepareEncounter),
        },
        {
            query: {
                resourceType: 'Immunization',
                search: (patient: Patient) => ({
                    patient: patient.id,
                    _count: 7,
                }),
            },
            widget: StandardCardContainerFabric(prepareImmunization),
        },
        {
            query: {
                resourceType: 'Observation',
                search: (patient: Patient) => ({
                    patient: patient.id,
                    _count: 7,
                }),
            },
            widget: StandardCardContainerFabric(prepareObservation),
        },
        {
            query: {
                resourceType: 'Procedure',
                search: (patient: Patient) => ({
                    subject: patient.id,
                    _count: 7,
                }),
            },
            widget: StandardCardContainerFabric(prepareProcedure),
        },
    ],
    left: [],
    right: [],
    bottom: [],
}

export const dashboard: Dashboard = {
    default: patientDashboardConfig,
};

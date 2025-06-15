import { PlusOutlined } from '@ant-design/icons';
import { t, Trans } from '@lingui/macro';
import { Immunization, Reference } from 'fhir/r4b';

import { questionnaireAction, ResourceListPage } from '@beda.software/emr/components';
import { SearchBarColumnType } from '@beda.software/emr/dist/components/SearchBar/types';
import { compileAsArray, formatHumanDateTime } from '@beda.software/emr/utils';

export const getPerformers = compileAsArray<Immunization,Reference>("Immunization.performer.actor")

export function ImmunizationsUberList() {
    return (
        <ResourceListPage<Immunization>
            headerTitle="Immunizations"
            resourceType="Immunization"
            getTableColumns={() => [
                {
                    title: 'Status',
                    dataIndex: 'status',
                    key: 'status',
                    render: (_text: any, { resource }) => {
                        return resource.status;
                    },
                },
                {
                    title: 'Date',
                    dataIndex: 'date',
                    key: 'date',
                    width: 250,
                    render: (_text: any, { resource }) => formatHumanDateTime(resource.occurrenceDateTime),
                },
                {
                    title: 'Vaccine',
                    key: 'vaccine',
                    width: 250,
                    render: (_text: any, { resource }) => resource.vaccineCode.text,
                },
                {
                    title: 'Patient',
                    dataIndex: 'patient',
                    key: 'patient',
                    render: (_text: any, { resource }) => {
                        const reference = resource.patient;
                        if (reference) {
                            return reference.display ?? reference.reference;

                        }
                    },
                },
                {
                    title: 'Performer',
                    dataIndex: 'performer',
                    key: 'performer',
                    render: (_text: any, { resource }) => {
                        const references = getPerformers(resource);
                        return references.map(reference =>
                            reference.display ?? reference.reference
                        );
                    },
                },

            ]}
            getFilters={() => [
                {
                    id: 'status',
                    searchParam: 'status',
                    type: SearchBarColumnType.CHOICE,
                    placeholder: t`Choose status`,
                    options: [
                        {
                            value: {
                                Coding: {
                                    code: 'completed ',
                                    display: 'Completed',
                                },
                            },
                        },
                        {
                            value: {
                                Coding: {
                                    code: ' entered-in-error ',
                                    display: 'Entered-in-error ',
                                },
                            },
                        },
                        {
                            value: {
                                Coding: {
                                    code: ' not-done ',
                                    display: 'Not-done',
                                },
                            },
                        },
                    ],
                    placement: ['table', 'search-bar'],
                },
            ]}
            getHeaderActions={() => [
                questionnaireAction(<Trans>Create immunization</Trans>, 'immunization-create-connectathon', {
                    icon: <PlusOutlined />,
                }),
            ]}
            getReportColumns={(bundle) => [
                {
                    title: t`Number of Iimmunizations`,
                    value: bundle.total,
                },
            ]}
        />
    );
}

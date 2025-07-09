import { ResourceListPage, navigationAction } from "@beda.software/emr/components";
import { SearchBarColumnType } from "@beda.software/emr/dist/components/SearchBar/types";
import { Questionnaire } from "fhir/r4b";

export function QuestionnaireList() {
    return (
        <ResourceListPage<Questionnaire>
            headerTitle="Questionnaires"
            resourceType="Questionnaire"
            getTableColumns={() => [
                {
                    title: "Title",
                    key: 'title',
                    render: (_text, { resource }) => {
                        return resource.title ?? resource.name ?? resource.id ?? 'No title';
                    },
                },
                {
                    title: "Status",
                    key: 'status',
                    render: (_text, { resource }) => {
                        return resource.status
                    },
                }
            ]}
            getHeaderActions={() => [
                navigationAction("Create new Questionnaire", './aidbox-forms-builder/new')
            ]}
            getRecordActions={({ resource }) => [
                navigationAction("Edit", `/questionnaires/${resource.id}/aidbox-forms-builder/edit`)
            ]}
            getFilters={() => [
                {
                    searchParam: '_ilike',
                    id: 'title',
                    type: SearchBarColumnType.STRING,
                    placeholder: 'Find questionnaire',
                    placement: ['table'],
                },
            ]}
        />
    );
}

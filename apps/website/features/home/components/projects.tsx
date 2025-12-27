import { CollapsibleList } from '@repo/design-system/components/collapsible-list';

import { PROJECTS } from '@/config/projects';
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelTitleSup,
} from '@repo/design-system/components/ui/panel';
import { ProjectItem } from './project-item';

export function Projects() {
  return (
    <Panel id="projects" className="space-y-4">
      <PanelHeader>
        <PanelTitle>
          Projects
          <PanelTitleSup>({PROJECTS.length})</PanelTitleSup>
        </PanelTitle>
      </PanelHeader>

      <CollapsibleList
        items={PROJECTS}
        max={4}
        renderItem={(item, isFirst, isLast) => (
          <ProjectItem project={item} isFirst={isFirst} isLast={isLast} />
        )}
      />
    </Panel>
  );
}

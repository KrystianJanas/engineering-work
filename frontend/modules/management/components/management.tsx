import { useState } from 'react';

import { LeftSidebar } from '~/components/compounds/Left-Sidebar/components';
import { options } from '~/components/compounds/Left-Sidebar/left-sidebar.constants';
import { SpinnerLoading } from '~/components/compounds/Spinner';
import { Layout } from '~/components/molecules/layout';

import { YourAnnouncements } from '../../announcements/your-announcements';
import { ManagementAnnouncements } from '../../management-announcements/announcements/components/announcements';

export const Management = () => {
  const [actuallyLocation, setActuallyLocation] =
    useState<keyof typeof options>(1);
  const [selectedOption, setSelectedOption] = useState(
    options[actuallyLocation][0].name
  );

  const changeNumber = () => {
    setActuallyLocation(2);
    setSelectedOption(options[2][0].name);
  };

  const getSelectedComponent = () => {
    if (selectedOption) {
      const findedOption = options[actuallyLocation].find(
        (option) => option.name === `${selectedOption}`
      )?.component;
      if (findedOption) {
        return findedOption;
      }
    }
    return <SpinnerLoading />;
  };

  return (
    <Layout display="flex" direction="row" minWidth="100%" paddingTop={15}>
      <LeftSidebar
        options={options[actuallyLocation]}
        onClick={(option: string) => setSelectedOption(option)}
        selected={selectedOption}
      />
      <Layout
        background="var(--background-white)"
        borderTopLeftRadius="8px"
        borderTopRightRadius="8px"
        width="100%"
        height="100%"
        padding={[40]}
      >
        {getSelectedComponent() === 'GetYourAnnouncements' && (
          <YourAnnouncements />
        )}
        {getSelectedComponent() === 'ManagementAnnouncements' && (
          <ManagementAnnouncements changeNumber={changeNumber} />
        )}
      </Layout>
    </Layout>
  );
};

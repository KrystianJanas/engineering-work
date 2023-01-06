import { useState } from 'react';

import { ArrowDown } from '~/components/icons/arrow-down';
import { ArrowUp } from '~/components/icons/arrow-up';
import { Layout } from '~/components/molecules/layout';

import { DropdownWindowTypes } from '../dropdown-window.types';

export const DropdownWindow = ({
  children,
  name,
  boxShadow,
  borderRadius,
}: DropdownWindowTypes) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Layout
      margin={[10, 0]}
      width="95%"
      marginLeft="auto"
      marginRight="auto"
      background="var(--background-white)"
      padding={[10, 25]}
      boxShadow={boxShadow && boxShadow}
      borderRadius={borderRadius && borderRadius}
    >
      <Layout display="flex" onClick={() => setExpanded(!expanded)}>
        {name}
        <Layout marginLeft="auto" marginTop="auto" marginBottom="auto">
          {expanded ? (
            <ArrowUp width={20} height={20} />
          ) : (
            <ArrowDown width={20} height={20} />
          )}
        </Layout>
      </Layout>
      {expanded && (
        <>
          {/* <Line /> */}
          <Layout
            width="95%"
            marginLeft="auto"
            marginRight="auto"
            marginTop={25}
          >
            {children}
          </Layout>
        </>
      )}
    </Layout>
  );
};

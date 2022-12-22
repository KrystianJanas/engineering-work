import styled from '@emotion/styled';

import { Text } from '~/components/atoms/typography';
import { Button } from '~/components/compounds/Button';
import { ModalComponentProps } from '~/components/compounds/ModalComponent/modal.types';
import { Layout } from '~/components/molecules/layout';
import { getRem } from '~/styles/utils';

const StyledLayout = styled(Layout)`
  z-index: 10;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledLayoutBlur = styled(Layout)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(4px);
  z-index: 5;
`;

export const ModalComponent = ({
  title,
  description,
  cancelButton,
  cancelText = '????',
  confirmButton,
  confirmText = '????',
  onHide,
  onConfirm,
  minWidth,
  minHeight,
}: ModalComponentProps) => {
  return (
    <StyledLayoutBlur>
      <StyledLayout
        display="flex"
        direction="column"
        width={400}
        height={200}
        background="var(--white)"
        borderRadius="8px"
        boxShadow="0 0 10px #ccc"
        padding={[15]}
        minWidth={minWidth && minWidth}
        minHeight={minHeight && minHeight}
        // make some drag outside component
      >
        <Layout display="flex" direction="column" gap="15px" flex={1}>
          <Text
            textAlign="center"
            weight={700}
            color="var(--text-black)"
            size={getRem(20)}
          >
            {title}
          </Text>
          <Text
            textAlign="center"
            weight={400}
            color="var(--text-black)"
            size={getRem(16)}
          >
            {description}
          </Text>
        </Layout>
        <Layout
          display="flex"
          direction="row"
          gap="25px"
          justifyContent="center"
        >
          {cancelButton && (
            <Button text={cancelText} onSubmit={() => onHide && onHide()} />
          )}
          {confirmButton && (
            <Button
              text={confirmText}
              onSubmit={() => onConfirm && onConfirm()}
            />
          )}
        </Layout>
      </StyledLayout>
    </StyledLayoutBlur>
  );
};

import styled from '@emotion/styled';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const standardHover = `
    color: var(--border-medium-black);
    
    &:hover {
      color: var(--border-full-black);
      cursor: pointer;
    }
`;

export const CustomDownloadIcon = styled(FileDownloadOutlinedIcon)`
  ${standardHover}
`;

export const CustomDeleteIcon = styled(DeleteOutlineOutlinedIcon)`
  ${standardHover}
`;

export const CustomInfoIcon = styled(InfoOutlinedIcon)`
  ${standardHover}
`;

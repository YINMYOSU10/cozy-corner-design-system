import type { Glyph } from './glyph';
import * as A_ from './A';
import * as B_ from './B';
import * as C_ from './C';
import * as D_ from './D';
import * as E_ from './E';
import * as F_ from './F';
import * as G_ from './G';
import * as H_ from './H';
import * as I_ from './I';
import * as J_ from './J';
import * as K_ from './K';
import * as L_ from './L';
import * as M_ from './M';
import * as N_ from './N';
import * as O_ from './O';
import * as P_ from './P';
import * as Q_ from './Q';
import * as R_ from './R';
import * as S_ from './S';
import * as T_ from './T';
import * as U_ from './U';
import * as V_ from './V';
import * as W_ from './W';
import * as X_ from './X';
import * as Y_ from './Y';

/** Every glyph, ordered by Figma name. For catalogues and pickers. */
export const allGlyphs: Glyph[] = [...Object.values(A_), ...Object.values(B_), ...Object.values(C_), ...Object.values(D_), ...Object.values(E_), ...Object.values(F_), ...Object.values(G_), ...Object.values(H_), ...Object.values(I_), ...Object.values(J_), ...Object.values(K_), ...Object.values(L_), ...Object.values(M_), ...Object.values(N_), ...Object.values(O_), ...Object.values(P_), ...Object.values(Q_), ...Object.values(R_), ...Object.values(S_), ...Object.values(T_), ...Object.values(U_), ...Object.values(V_), ...Object.values(W_), ...Object.values(X_), ...Object.values(Y_)].sort((a, b) =>
  a.figmaName.localeCompare(b.figmaName) || a.figmaId.localeCompare(b.figmaId),
);

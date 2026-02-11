use solana_program::{
    account_info::AccountInfo,
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    pubkey::Pubkey,
};

// Definiujemy punkt wejścia do programu
entrypoint!(process_instruction);

pub fn process_instruction(
    program_id: &Pubkey,
    _accounts: &[AccountInfo],
    _instruction_data: &[u8],
) -> ProgramResult {
    msg!("Witaj Fundacjo Solana! To jest mój pierwszy program pod Grant.");
    msg!("Program ID: {}", program_id);

    Ok(())
}
